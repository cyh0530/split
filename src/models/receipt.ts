import { ReceiptItem } from "./receiptItem"

export type Receipt = {
    items: ReceiptItem[];
    subTotal: number;
    tip: number;
    tax: number;
    totalPrice: number;
}