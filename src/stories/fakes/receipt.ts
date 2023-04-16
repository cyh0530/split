import { Receipt } from "../../models/receipt";
import { receiptItems } from "./receiptItem";

export const receipt: Receipt = {
    items: receiptItems,
    tip: 15,
    tax: 20,
    totalPrice: 100
}