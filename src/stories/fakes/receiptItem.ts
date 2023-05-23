import { ReceiptItem } from "../../models/receiptItem";

export const fakeInitialReceiptItems: ReceiptItem[] = [
    {
        id: "Bahn, James Bahn",
        name: "Bahn, James Bahn",
        quantity: 1,
        unitPrice: 16.95,
        totalPrice: 16.95,
        buyers: [new Set<string>()]
    },
    {
        id: "Fish & Fries",
        name: "Fish & Fries",
        quantity: 1,
        unitPrice: 14.95,
        totalPrice: 14.95,
        buyers: [new Set<string>()]
    },
    {
        id: "Crispy Fried Chicken",
        name: "Crispy Fried Chicken",
        quantity: 1,
        unitPrice: 15.95,
        totalPrice: 15.95,
        buyers: [new Set<string>()]
    },
    {
        id: "Tots",
        name: "Tots",
        quantity: 1,
        unitPrice: 2,
        totalPrice: 2,
        buyers: [new Set<string>()]
    },
    {
        id: "Shroom & Truffle Shuffle",
        name: "Shroom & Truffle Shuffle",
        quantity: 1,
        unitPrice: 15.95,
        totalPrice: 15.95,
        buyers: [new Set<string>()]
    },
    {
        id: "James West",
        name: "James West",
        quantity: 2,
        unitPrice: 16.95,
        totalPrice: 16.95 * 2,
        buyers: [new Set<string>(), new Set<string>()]
    },
    {
        id: "Caesar Salad",
        name: "Caesar Salad",
        quantity: 1,
        unitPrice: 5.5,
        totalPrice: 5.5,
        buyers: [new Set<string>()]
    },
    {
        id: "Tots-2",
        name: "Tots",
        quantity: 1,
        unitPrice: 3.95,
        totalPrice: 3.95,
        buyers: [new Set<string>()]
    },
    {
        id: "Vanilla Shake",
        name: "Vanilla Shake",
        quantity: 1,
        unitPrice: 7.95,
        totalPrice: 7.95,
        buyers: [new Set<string>()]
    },
    {
        id: "Processing Fee",
        name: "Processing Fee",
        quantity: 1,
        unitPrice: 4.51,
        totalPrice: 4.51,
        buyers: [new Set<string>()]
    }
]

export const fakeReceiptItems: ReceiptItem[] = [
    {
        id: "Bahn, James Bahn",
        name: "Bahn, James Bahn",
        quantity: 1,
        unitPrice: 16.95,
        totalPrice: 16.95,
        buyers: [new Set<string>(["Angus"])]
    },
    {
        id: "Fish & Fries",
        name: "Fish & Fries",
        quantity: 1,
        unitPrice: 14.95,
        totalPrice: 14.95,
        buyers: [new Set<string>(["Angus"])]
    },
    {
        id: "Crispy Fried Chicken",
        name: "Crispy Fried Chicken",
        quantity: 1,
        unitPrice: 15.95,
        totalPrice: 15.95,
        buyers: [new Set<string>(["Justin L."])]
    },
    {
        id: "Tots",
        name: "Tots",
        quantity: 1,
        unitPrice: 2,
        totalPrice: 2,
        buyers: [new Set<string>(["Justin L."])]
    },
    {
        id: "Shroom & Truffle Shuffle",
        name: "Shroom & Truffle Shuffle",
        quantity: 1,
        unitPrice: 15.95,
        totalPrice: 15.95,
        buyers: [new Set<string>(["Justin"])]
    },
    {
        id: "James West",
        name: "James West",
        quantity: 2,
        unitPrice: 16.95,
        totalPrice: 16.95 * 2,
        buyers: [new Set<string>(["Albert"]), new Set<string>(["Vincent"])]
    },
    {
        id: "Caesar Salad",
        name: "Caesar Salad",
        quantity: 1,
        unitPrice: 5.5,
        totalPrice: 5.5,
        buyers: [new Set<string>(["Albert"])]
    },
    {
        id: "Tots-2",
        name: "Tots",
        quantity: 1,
        unitPrice: 3.95,
        totalPrice: 3.95,
        buyers: [new Set<string>(["Albert"])]
    },
    {
        id: "Vanilla Shake",
        name: "Vanilla Shake",
        quantity: 1,
        unitPrice: 7.95,
        totalPrice: 7.95,
        buyers: [new Set<string>(["Vincent"])]
    },
    {
        id: "Processing Fee",
        name: "Processing Fee",
        quantity: 1,
        unitPrice: 4.51,
        totalPrice: 4.51,
        buyers: [new Set<string>(["Albert", "Angus", "Justin", "Justin L.", "Vincent"])]
    }
]