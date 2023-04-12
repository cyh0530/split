import { ReceiptItem } from "./receiptItem";

export type SplitCheck = {
    name: string; // human name
    items: ReceiptItem[];
    tax: number;
    tip: number;
    subTotalPrice: number;
    totalPrice: number;
}