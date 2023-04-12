import { ReceiptItem } from "./receiptItem"

export type Receipt = {
    items: ReceiptItem[];
    tip: number;
    tax: number;
    totalPrice: number;
}