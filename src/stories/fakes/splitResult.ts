import { SplitCheck } from "../../models/splitCheck";
import { fakeReceiptItems } from "./receiptItem";

export const fakeSplitCheckResults: SplitCheck[] = [
    {
        name: "Albert",
        items: fakeReceiptItems,
        tax: 1,
        tip: 1,
        subTotalPrice: 10,
        totalPrice: 12
    },
    {
        name: "Bob",
        items: fakeReceiptItems,
        tax: 1,
        tip: 1,
        subTotalPrice: 10,
        totalPrice: 12
    }
]