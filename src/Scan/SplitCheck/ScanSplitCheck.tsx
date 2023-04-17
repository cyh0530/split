import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Receipt } from "../../models/receipt";
import { ReceiptItem } from "../../models/receiptItem";
import { CheckItem } from "./CheckItem";
import { CheckSummaryItem } from "./CheckSummaryItem";
import { useState } from "react";

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

  const updateItem = (
    itemId: string,
    newUnitPrice: number,
    newQuantity: number
  ) => {
    const nextReceipt = Object.assign({}, receipt);
    const itemIndex = nextReceipt.items.findIndex((item) => item.id === itemId);
    nextReceipt.items[itemIndex].unitPrice = newUnitPrice;
    nextReceipt.items[itemIndex].quantity = newQuantity;
    var totalPrice = parseFloat((newQuantity * newUnitPrice).toFixed(2));
    nextReceipt.items[itemIndex].totalPrice = totalPrice;
    setEditingReceipt(nextReceipt);
  };

  const updateSummaryItem = (summaryType: string, value: number) => {
    const nextReceipt = Object.assign({}, receipt);
    if (summaryType === "Tax") {
      nextReceipt.tax = value;
    } else if (summaryType === "Tip") {
      nextReceipt.tip = value;
    } else if (summaryType === "Total") {
      nextReceipt.totalPrice = value;
    }
    setEditingReceipt(nextReceipt);
  };

  const onFinishEditing = () => {
    setReceipt(editingReceipt)
    setIsEdit(false);
  };

  const onCancelEditing = () => {
    setReceipt(receipt);
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
              <IconButton color="success" onClick={onFinishEditing}>
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
      {receipt.items.map((item) => (
        <CheckItem
          key={item.id}
          item={item}
          isEdit={isEdit}
          party={party}
          updateItem={updateItem}
          handleAddBuyerNameToItem={handleAddBuyerNameToItem}
        />
      ))}
      <CheckSummaryItem
        summaryType={"Tax"}
        value={receipt.tax}
        updateItem={updateSummaryItem}
      />
      <CheckSummaryItem
        summaryType={"Tip"}
        value={receipt.tip}
        updateItem={updateSummaryItem}
      />
      <CheckSummaryItem
        summaryType={"Total"}
        value={receipt.totalPrice}
        updateItem={updateSummaryItem}
      />
    </List>
  );
}
