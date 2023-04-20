import { Receipt } from "../../models/receipt";
import { fakeInitialReceiptItems, fakeReceiptItems } from "./receiptItem";

export const fakeInitialReceipt: Receipt = {
    items: fakeInitialReceiptItems,
    subTotal: 121.61,
    tip: 19.34,
    tax: 11.85,
    totalPrice: 152.8
}

export const fakeReceipt: Receipt = {
    ...fakeInitialReceipt,
    items: fakeReceiptItems,
}