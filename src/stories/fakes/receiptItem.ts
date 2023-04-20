import { ReceiptItem } from "../../models/receiptItem";

export const fakeInitialReceiptItems: ReceiptItem[] = [
    {
        id: "1",
        name: "Very very long food name that is very long",
        quantity: 1,
        unitPrice: 10,
        totalPrice: 10,
        buyers: [[]]
    },
    {
        id: "2",
        name: "Food 2",
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
        buyers: [[]]
    },
    {
        id: "3",
        name: "Food 3",
        quantity: 2,
        unitPrice: 12,
        totalPrice: 24,
        buyers: [[], []]
    }
]

export const fakeReceiptItems: ReceiptItem[] = [
    {
        id: "1",
        name: "Very very long food name that is very long",
        quantity: 1,
        unitPrice: 10,
        totalPrice: 10,
        buyers: [["Albert"]]
    },
    {
        id: "2",
        name: "Food 2",
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
        buyers: [["Albert"]]
    },
    {
        id: "3",
        name: "Food 3",
        quantity: 2,
        unitPrice: 12,
        totalPrice: 24,
        buyers: [["Albert"], ["Bob"]]
    }
]