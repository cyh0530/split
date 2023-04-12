import { List } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Receipt } from "../../models/receipt";
import { ReceiptItem } from "../../models/receiptItem";
import { CheckItem } from "./CheckItem";
import { CheckSummaryItem } from "./CheckSummaryItem";

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
  const handleAddBuyerNameToItem = (
    item: ReceiptItem,
    name: string,
    index: number
  ) => {
    const nextReceipt = Object.assign({}, receipt);
    const itemId = item.id;
    const itemIndex = nextReceipt.items.findIndex((item) => item.id === itemId);
    const buyers = nextReceipt.items[itemIndex].buyer;
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
    setReceipt(nextReceipt);
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
    setReceipt(nextReceipt);
  };

  return (
    <List>
      {receipt.items.map((item) => (
        <CheckItem
          key={item.id}
          item={item}
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
