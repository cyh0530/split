import { Receipt } from "../models/receipt";

export function calculateReceiptSubTotal(receipt: Receipt): number {
    let subTotal = 0;
    receipt.items.forEach(item => {
        subTotal += item.quantity * item.unitPrice;
    })
    return subTotal;
}