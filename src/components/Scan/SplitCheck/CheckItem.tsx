import { Fragment, useEffect, useRef, useState } from "react";
import {
  Box,
  Chip,
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
import DeleteIcon from "@mui/icons-material/Delete";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { ReceiptItem } from "../../../models/receiptItem";

interface CheckItemProps {
  item: ReceiptItem;
  party: string[];
  isEdit: boolean;
  updateItem: (
    id: string,
    newItemName: string,
    newUnitPrice: number,
    newQuantity: number
  ) => void;
  onAddBuyerNameToItem: (
    item: ReceiptItem,
    name: string,
    index: number
  ) => void;
  onRemoveBuyerNameFromItem: (
    item: ReceiptItem,
    name: string,
    index: number
  ) => void;
  onDelete: (itemId: string) => void;
}

function isValidItemName(itemName: string) {
  return itemName.trim().length !== 0;
}

function isValidItemNumber(itemNumber: number) {
  return itemNumber > 0;
}

export function CheckItem({
  item,
  party,
  isEdit,
  updateItem,
  onAddBuyerNameToItem,
  onRemoveBuyerNameFromItem,
  onDelete,
}: CheckItemProps) {
  const [itemNameError, setItemNameError] = useState(false);
  const [unitPriceError, setUnitPriceError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [totalPrice, setTotalPrice] = useState(item.totalPrice);
  const itemNameRef = useRef<HTMLInputElement>(null);
  const unitPriceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setItemNameError(!isValidItemName(item.name));
    setUnitPriceError(!isValidItemNumber(item.unitPrice));
    setQuantityError(!isValidItemNumber(item.quantity));
  }, [item]);

  const handleItemChange = () => {
    const newItemName = itemNameRef.current?.value;
    const newUnitPriceStr = unitPriceRef.current?.value;
    const newQuantityStr = quantityRef.current?.value;
    let valueError = false;

    if (!newItemName || !isValidItemName(newItemName)) {
      setItemNameError(true);
      valueError = true;
    } else {
      setItemNameError(false);
    }

    if (!newUnitPriceStr || !isValidItemNumber(parseFloat(newUnitPriceStr))) {
      setUnitPriceError(true);
      valueError = true;
    } else {
      setUnitPriceError(false);
    }

    if (!newQuantityStr || !isValidItemNumber(parseFloat(newQuantityStr))) {
      setQuantityError(true);
      valueError = true;
    } else {
      setQuantityError(false);
    }

    if (!valueError && !!newItemName && !!newUnitPriceStr && !!newQuantityStr) {
      const newUnitPrice = parseFloat(newUnitPriceStr);
      const newQuantity = parseFloat(newQuantityStr);
      var totalPrice = parseFloat((newUnitPrice * newQuantity).toFixed(2));
      setTotalPrice(totalPrice);
      updateItem(item.id, newItemName, newUnitPrice, newQuantity);
    }
  };

  const isAllNameSelected = (index: number) =>
    item.buyers[index].size === party.length;

  const handleSelectAll = (index: number) => {
    for (const name of party) {
      onAddBuyerNameToItem(item, name, index);
    }
  };

  const handleDeselectAll = (index: number) => {
    for (const name of party) {
      onRemoveBuyerNameFromItem(item, name, index);
    }
  };

  return (
    <>
      <ListItem>
        <ListItemText disableTypography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {isEdit ? (
              <>
                <TextField
                  error={itemNameError}
                  inputRef={itemNameRef}
                  label={"Item Name"}
                  defaultValue={item.name}
                  size="small"
                  variant="standard"
                  onChange={handleItemChange}
                  multiline
                />
                <Box>
                  <IconButton onClick={() => onDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography>
                    {`${item.name} ($${item.unitPrice} * ${item.quantity})`}
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: "bold" }}>
                  ${totalPrice}
                </Typography>
              </>
            )}
          </Box>
        </ListItemText>
      </ListItem>
      {isEdit ? (
        <List>
          <ListItem>
            <ListItemText disableTypography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}
                  >
                    <Typography>$</Typography>
                    <TextField
                      error={unitPriceError}
                      inputRef={unitPriceRef}
                      type="number"
                      label={"Unit Price"}
                      defaultValue={item.unitPrice}
                      size="small"
                      variant="standard"
                      onChange={handleItemChange}
                      sx={{ width: 85 }}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}
                  >
                    <Typography>*</Typography>
                    <TextField
                      error={quantityError}
                      inputRef={quantityRef}
                      type="number"
                      label={"Quantity"}
                      defaultValue={item.quantity}
                      size="small"
                      variant="standard"
                      onChange={handleItemChange}
                      sx={{ width: 85 }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    = ${totalPrice}
                  </Typography>
                </Box>
              </Box>
            </ListItemText>
          </ListItem>
        </List>
      ) : (
        <List>
          {Array.from(Array(item.quantity).keys()).map((index) => (
            <Fragment key={`${item.id}-${index}`}>
              <ListItem>
                <ListItemIcon>
                  <FastfoodIcon />
                </ListItemIcon>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <Chip
                    label="Everyone"
                    color="info"
                    variant={isAllNameSelected(index) ? "filled" : "outlined"}
                    onClick={
                      isAllNameSelected(index)
                        ? () => handleDeselectAll(index)
                        : () => handleSelectAll(index)
                    }
                  />
                  {party.map((name) => {
                    const containCurrentBuyer = item.buyers[index].has(name);
                    return (
                      <Chip
                        key={name}
                        label={name}
                        variant={containCurrentBuyer ? "filled" : "outlined"}
                        deleteIcon={
                          containCurrentBuyer ? (
                            <DoneIcon />
                          ) : (
                            <Box sx={{ width: "1em", height: "1em" }} />
                          )
                        }
                        onDelete={() =>
                          containCurrentBuyer
                            ? onRemoveBuyerNameFromItem(item, name, index)
                            : onAddBuyerNameToItem(item, name, index)
                        }
                        onClick={() =>
                          containCurrentBuyer
                            ? onRemoveBuyerNameFromItem(item, name, index)
                            : onAddBuyerNameToItem(item, name, index)
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
      )}

      <Divider />
    </>
  );
}
