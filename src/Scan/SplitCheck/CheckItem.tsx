import { Fragment, useRef, useState } from "react";
import {
  Box,
  Chip,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { ReceiptItem } from "../../models/receiptItem";

interface CheckItemProps {
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
}: CheckItemProps) {
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
    <>
      <ListItem>
        <ListItemText
          disableTypography
          primary={
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>
                {item.name} (${item.unitPrice} * {item.quantity})
              </Typography>
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
                  <Typography sx={{ fontWeight: 700 }}>
                    ${item.totalPrice}
                  </Typography>
                )}
              </Box>
            </Box>
          }
        />
      </ListItem>
      <Collapse in={true}>
        <List>
          {Array.from(Array(item.quantity).keys()).map((index) => (
            <Fragment key={`${item.name}-${index}`}>
              <ListItem>
                <ListItemIcon>
                  <FastfoodIcon />
                </ListItemIcon>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {party.map((name) => {
                    const containCurrentBuyer =
                      item.buyers[index].includes(name);
                    return (
                      <Chip
                        key={name}
                        label={name}
                        variant={containCurrentBuyer ? "filled" : "outlined"}
                        deleteIcon={
                          containCurrentBuyer ? <DoneIcon /> : undefined
                        }
                        onDelete={
                          containCurrentBuyer
                            ? () => handleAddBuyerNameToItem(item, name, index)
                            : undefined
                        }
                        onClick={() =>
                          handleAddBuyerNameToItem(item, name, index)
                        }
                      />
                    );
                  })}
                </Box>
              </ListItem>
              {index !== item.quantity - 1 && (
                <Divider variant="middle" component="li" />
              )}
            </Fragment>
          ))}
        </List>
      </Collapse>
      <Divider />
    </>
  );
}
