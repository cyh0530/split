import { SplitCheck } from "../../models/splitCheck";

export const splitCheckResults: SplitCheck[] = [
    {
        name: "Albert",
        items: [
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
                id: "1",
                name: "Food 1",
                quantity: 2,
                unitPrice: 12,
                totalPrice: 24,
                buyers: [["Albert"]]
            }
        ],
        tax: 1,
        tip: 1,
        subTotalPrice: 10,
        totalPrice: 12
    },
    {
        name: "Bob",
        items: [
            {
                id: "1",
                name: "Food 1",
                quantity: 1,
                unitPrice: 10,
                totalPrice: 10,
                buyers: [["Bob"]]
            },
            {
                id: "2",
                name: "Food 2",
                quantity: 1,
                unitPrice: 15,
                totalPrice: 15,
                buyers: [["Bob"]]
            },
            {
                id: "1",
                name: "Food 1",
                quantity: 2,
                unitPrice: 12,
                totalPrice: 24,
                buyers: [["Bob"]]
            }
        ],
        tax: 1,
        tip: 1,
        subTotalPrice: 10,
        totalPrice: 12
    }
]