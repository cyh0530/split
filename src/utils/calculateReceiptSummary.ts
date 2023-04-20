import { Receipt } from "../models/receipt";
import { round } from "./round";

export function calculateReceiptTotal(receipt: Receipt): number {
  let total = calculateReceiptSubTotal(receipt);
  total += receipt.tax + receipt.tip;
  return round(total);
}

export function calculateReceiptSubTotal(receipt: Receipt): number {
  let subTotal = 0;
  receipt.items.forEach((item) => {
    subTotal += item.totalPrice;
  });
  return round(subTotal);
}
