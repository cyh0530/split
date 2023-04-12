import { useRef, useState } from "react";
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ReceiptItem } from "../../models/receiptItem";

interface CheckItem {
  item: ReceiptItem;
  party: string[];
  updateItem: (id: string, newUnitPrice: number, newQuantity: number) => void;
  handleAddBuyerNameToItem: (
    item: ReceiptItem,
    name: string,
    index: number
  ) => void;
}

export function CheckItem({
  item,
  party,
  updateItem,
  handleAddBuyerNameToItem,
}: CheckItem) {
  const [isEdit, setIsEdit] = useState(false);
  const [editSubmitEnabled, setEditSubmitEnabled] = useState(false);
  const [unitPriceError, setUnitPriceError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [totalPrice, setTotalPrice] = useState(item.totalPrice);
  const unitPriceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  const handleEditItem = () => {
    const newUnitPrice = unitPriceRef.current?.value;
    const newQuantity = quantityRef.current?.value;
    if (
      !newUnitPrice ||
      parseFloat(newUnitPrice) <= 0 ||
      !newQuantity ||
      parseFloat(newQuantity) <= 0
    ) {
      return;
    }

    updateItem(item.id, parseFloat(newUnitPrice), parseFloat(newQuantity));
    setIsEdit(false);
  };

  const handleItemChange = () => {
    const newUnitPrice = unitPriceRef.current?.value;
    const newQuantity = quantityRef.current?.value;

    if (!newUnitPrice || parseFloat(newUnitPrice) <= 0) {
      setEditSubmitEnabled(true);
      setUnitPriceError(true);
      return;
    }

    if (!newQuantity || parseFloat(newQuantity) <= 0) {
      setEditSubmitEnabled(true);
      setQuantityError(true);
      return;
    }

    var totalPrice = parseFloat(
      (parseFloat(newUnitPrice) * parseFloat(newQuantity)).toFixed(2)
    );
    setTotalPrice(totalPrice);
    setEditSubmitEnabled(false);
  };

  return (
    <ListItem
      secondaryAction={
        !isEdit && (
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        )
      }
    >
      <ListItemText
        primary={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{item.name}</Typography>
            <Box>
              {isEdit ? (
                <>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      error={unitPriceError}
                      ref={unitPriceRef}
                      type="number"
                      label={"Unit Price"}
                      defaultValue={item.unitPrice}
                      size="small"
                      helperText={
                        unitPriceError && "Please enter a valid number"
                      }
                      onChange={handleItemChange}
                    />
                    <Typography>*</Typography>
                    <TextField
                      error={quantityError}
                      ref={quantityRef}
                      type="number"
                      label={"Quantity"}
                      defaultValue={item.quantity}
                      size="small"
                      helperText={
                        quantityError && "Please enter a valid number"
                      }
                      onChange={handleItemChange}
                    />
                    <Typography>= {totalPrice}</Typography>
                  </Box>
                  <IconButton
                    color="success"
                    onClick={handleEditItem}
                    disabled={editSubmitEnabled}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setIsEdit(false)}>
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <Typography>
                  {item.unitPrice} * {item.quantity} = {item.totalPrice}
                </Typography>
              )}
            </Box>
          </Box>
        }
        secondary={
          item.quantity === 1 && (
            <Box>
              {party.map((name) => (
                <Chip
                  label={name}
                  onClick={() => handleAddBuyerNameToItem(item, name, 0)}
                />
              ))}
            </Box>
          )
        }
      />
      {item.quantity > 1 && (
        <Collapse>
          <List>
            {new Array<number>(item.quantity).map((i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={<Typography>{item.name}</Typography>}
                  secondary={
                    <Box>
                      {party.map((name) => (
                        <Chip
                          label={name}
                          onClick={() =>
                            handleAddBuyerNameToItem(item, name, i)
                          }
                        />
                      ))}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </ListItem>
  );
}
