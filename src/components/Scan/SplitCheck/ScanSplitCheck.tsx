import { useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";
import { Receipt, ReceiptItem } from "../../../models";
import { CheckItem } from "./CheckItem";
import { CheckSummaryItem } from "./CheckSummaryItem";
import {
  calculateReceiptTotal,
  calculateReceiptSubTotal,
  generateId,
} from "../../../utils";

interface ScanSplitCheckProps {
  party: string[];
  receipt: Receipt;
  setReceipt: React.Dispatch<React.SetStateAction<Receipt>>;
}

export function ScanSplitCheck({
  party,
  receipt,
  setReceipt,
}: ScanSplitCheckProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [disableFinishEditBtn, setDisableFinishEditBtn] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState<Receipt>(receipt);

  const handleAddBuyerNameToItem = (
    item: ReceiptItem,
    name: string,
    index: number
  ) => {
    const nextReceipt = Object.assign({}, receipt);
    const itemId = item.id;
    const itemIndex = nextReceipt.items.findIndex((item) => item.id === itemId);
    const buyers = nextReceipt.items[itemIndex].buyers;
    const nameIndex = buyers[index].indexOf(name);
    if (nameIndex !== -1) {
      buyers[index].splice(nameIndex, 1);
    } else {
      buyers[index].push(name);
    }
    setReceipt(nextReceipt);
  };

  const handleAddItem = () => {
    const nextReceipt = _.cloneDeep(editingReceipt);
    nextReceipt.items.push({
      id: generateId(),
      name: "",
      unitPrice: 0,
      quantity: 0,
      totalPrice: 0,
      buyers: [],
    });
    updateReceipt(nextReceipt);
  };

  const handleDeleteItem = (itemId: string) => {
    const nextReceipt = _.cloneDeep(editingReceipt);
    const items = nextReceipt.items;
    const itemIndex = items.findIndex((item) => item.id === itemId);
    nextReceipt.items.splice(itemIndex, 1);
    updateReceipt(nextReceipt);
  };

  const updateItem = (
    itemId: string,
    newItemName: string,
    newUnitPrice: number,
    newQuantity: number
  ) => {
    const nextReceipt = _.cloneDeep(editingReceipt);
    const items = nextReceipt.items;
    const itemIndex = items.findIndex((item) => item.id === itemId);
    const currentItem = items[itemIndex];
    currentItem.name = newItemName;
    currentItem.unitPrice = newUnitPrice;
    currentItem.quantity = newQuantity;
    if (newQuantity < currentItem.buyers.length) {
      currentItem.buyers = currentItem.buyers.slice(0, newQuantity);
    } else if (newQuantity > currentItem.buyers.length) {
      for (let i = currentItem.buyers.length; i < newQuantity; i++) {
        currentItem.buyers.push([]);
      }
    }

    var totalPrice = parseFloat((newQuantity * newUnitPrice).toFixed(2));
    nextReceipt.items[itemIndex].totalPrice = totalPrice;
    updateReceipt(nextReceipt);
  };

  const updateSummaryItem = (summaryType: string, value: number) => {
    const nextReceipt = _.cloneDeep(editingReceipt);
    if (summaryType === "Tax") {
      nextReceipt.tax = value;
    } else if (summaryType === "Tip") {
      nextReceipt.tip = value;
    }
    updateReceipt(nextReceipt);
  };

  const updateReceipt = (nextReceipt: Receipt) => {
    const calculateSubTotal = calculateReceiptSubTotal(nextReceipt);
    const calculatedTotal = calculateReceiptTotal(nextReceipt);
    nextReceipt.subTotal = calculateSubTotal;
    nextReceipt.totalPrice = calculatedTotal;
    setEditingReceipt(nextReceipt);
    checkReceiptValidity(nextReceipt);
  };

  const checkReceiptValidity = (receipt: Receipt) => {
    console.log(receipt)
    let disableFinishBtn = false;
    receipt.items.forEach((item) => {
      if (
        item.name.trim().length === 0 ||
        item.unitPrice <= 0 ||
        item.quantity <= 0
      ) {
        disableFinishBtn = true;
      }
    });
    if (receipt.tax <= 0 || receipt.tip <= 0) {
      disableFinishBtn = true;
    }
    setDisableFinishEditBtn(disableFinishBtn);
  };

  const onFinishEditing = () => {
    setReceipt(editingReceipt);
    setIsEdit(false);
  };

  const onCancelEditing = () => {
    console.log(receipt);
    setEditingReceipt(receipt);
    setIsEdit(false);
  };

  return (
    <List>
      <ListItem
        divider
        secondaryAction={
          !isEdit ? (
            <IconButton onClick={() => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          ) : (
            <Box display="flex" gap="1">
              <IconButton
                disabled={disableFinishEditBtn}
                color="success"
                onClick={onFinishEditing}
              >
                <CheckIcon />
              </IconButton>
              <IconButton color="error" onClick={onCancelEditing}>
                <CloseIcon />
              </IconButton>
            </Box>
          )
        }
        sx={{ pb: 5 }}
      />
      {editingReceipt.items.map((item) => (
        <CheckItem
          key={item.id}
          item={item}
          isEdit={isEdit}
          party={party}
          updateItem={updateItem}
          handleAddBuyerNameToItem={handleAddBuyerNameToItem}
          handleDelete={handleDeleteItem}
        />
      ))}
      {isEdit && (
        <ListItemButton onClick={handleAddItem}>
          <Typography color="text.secondary">+ Add Item</Typography>
        </ListItemButton>
      )}
      <ListItem dense>
        <ListItemText disableTypography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">Subtotal</Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              ${editingReceipt.subTotal}
            </Typography>
          </Box>
        </ListItemText>
      </ListItem>
      <CheckSummaryItem
        isEdit={isEdit}
        summaryType={"Tax"}
        subTotal={editingReceipt.subTotal}
        value={editingReceipt.tax}
        updateItem={updateSummaryItem}
      />
      <CheckSummaryItem
        isEdit={isEdit}
        summaryType={"Tip"}
        subTotal={editingReceipt.subTotal}
        value={editingReceipt.tip}
        updateItem={updateSummaryItem}
      />
      <ListItem dense>
        <ListItemText disableTypography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Total</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              ${editingReceipt.totalPrice}
            </Typography>
          </Box>
        </ListItemText>
      </ListItem>
    </List>
  );
}