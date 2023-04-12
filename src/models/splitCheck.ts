export type SplitCheck = {
    name: string; // human name
    items: {
        name: string;
        quantity: number;
        price: number;
        note?: string;
    }[];
    tax: number;
    tip: number;
    subTotalPrice: number;
    totalPrice: number;
}