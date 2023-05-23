import { useCallback, useEffect, useState } from "react";
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
  round,
} from "../../../utils";
import { ScanContainer } from "../ScanContainer";

interface ScanSplitCheckProps {
  party: string[];
  receipt: Receipt;
  setReceipt: React.Dispatch<React.SetStateAction<Receipt>>;
  setDisableNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  setDisablePrevStep: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ScanSplitCheck({
  party,
  receipt,
  setReceipt,
  setDisableNextStep,
  setDisablePrevStep,
}: ScanSplitCheckProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [disableFinishEditBtn, setDisableFinishEditBtn] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState<Receipt>(receipt);

  useEffect(() => {
    let someItemNotSelected = false;
    receipt.items.forEach((item) => {
      item.buyers.forEach((unitBuyers) => {
        if (unitBuyers.size === 0) {
          someItemNotSelected = true;
        }
      });
    });
    setDisableNextStep(isEdit || someItemNotSelected);
    setDisablePrevStep(isEdit);
  }, [isEdit, receipt, setDisableNextStep, setDisablePrevStep]);

  const handleAddBuyerNameToItem = (
    item: ReceiptItem,
    name: string,
    index: number
  ) => {
    const nextReceipt = Object.assign({}, receipt);
    const itemId = item.id;
    const itemIndex = nextReceipt.items.findIndex((item) => item.id === itemId);
    const buyers = nextReceipt.items[itemIndex].buyers;
    buyers[index].add(name);
    setReceipt(nextReceipt);
  };

  const handleRemoveBuyerNameFromItem = (
    item: ReceiptItem,
    name: string,
    index: number
  ) => {
    const nextReceipt = Object.assign({}, receipt);
    const itemId = item.id;
    const itemIndex = nextReceipt.items.findIndex((item) => item.id === itemId);
    const buyers = nextReceipt.items[itemIndex].buyers;
    buyers[index].delete(name);
    setReceipt(nextReceipt);
  };

  const handleAddItem = () => {
    const nextReceipt = _.cloneDeep(editingReceipt);
    nextReceipt.items.push({
      id: generateId(),
      name: "",
      unitPrice: 0,
      quantity: 1,
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
        currentItem.buyers.push(new Set<string>());
      }
    }

    var totalPrice = round(newQuantity * newUnitPrice);
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

  const checkReceiptValidity = useCallback(
    (receipt: Receipt) => {
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
    },
    [setDisableFinishEditBtn]
  );

  const updateReceipt = useCallback(
    (nextReceipt: Receipt) => {
      const calculateSubTotal = calculateReceiptSubTotal(nextReceipt);
      const calculatedTotal = calculateReceiptTotal(nextReceipt);
      nextReceipt.subTotal = calculateSubTotal;
      nextReceipt.totalPrice = calculatedTotal;
      setEditingReceipt(nextReceipt);
      checkReceiptValidity(nextReceipt);
    },
    [setEditingReceipt, checkReceiptValidity]
  );

  useEffect(() => {
    // auto correct sub total and total
    updateReceipt(receipt);
  }, [updateReceipt, receipt]);

  const onFinishEditing = () => {
    setReceipt(editingReceipt);
    setIsEdit(false);
  };

  const onCancelEditing = () => {
    setEditingReceipt(receipt);
    setIsEdit(false);
  };

  return (
    <ScanContainer
      title="Split the Check"
      titleIcon={
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
    >
      <List>
        {editingReceipt.items.map((item) => (
          <CheckItem
            key={item.id}
            item={item}
            isEdit={isEdit}
            party={party}
            updateItem={updateItem}
            onAddBuyerNameToItem={handleAddBuyerNameToItem}
            onRemoveBuyerNameFromItem={handleRemoveBuyerNameFromItem}
            onDelete={handleDeleteItem}
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
    </ScanContainer>
  );
}
