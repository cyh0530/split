import { Receipt } from "../../models/receipt";
import { fakeInitialReceiptItems, fakeReceiptItems } from "./receiptItem";

export const fakeInitialReceipt: Receipt = {
    items: fakeInitialReceiptItems,
    subTotal: 50,
    tip: 15,
    tax: 20,
    totalPrice: 100
}

export const fakeReceipt: Receipt = {
    items: fakeReceiptItems,
    subTotal: 50,
    tip: 15,
    tax: 20,
    totalPrice: 100
}