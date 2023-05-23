export type ReceiptItem = {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    buyers: Set<string>[];
    note?: string;
}