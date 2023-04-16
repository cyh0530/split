import { SplitCheck } from "../../models/splitCheck";
import { receiptItems } from "./receiptItem";

export const splitCheckResults: SplitCheck[] = [
    {
        name: "Albert",
        items: receiptItems,
        tax: 1,
        tip: 1,
        subTotalPrice: 10,
        totalPrice: 12
    },
    {
        name: "Bob",
        items: receiptItems,
        tax: 1,
        tip: 1,
        subTotalPrice: 10,
        totalPrice: 12
    }
]