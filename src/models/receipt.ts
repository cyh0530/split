import { ReceiptItem } from "./receiptItem"

export type Receipt = {
    items: ReceiptItem[];
    subTotal: number;
    tip: number;
    tax: number;
    totalPrice: number;
}

export const emptyReceipt: Receipt = {
    items: [],
    subTotal: 0,
    tip: 0,
    tax: 0,
    totalPrice: 0
}