import { Receipt } from "../../models";
import { ReceiptResult } from "../generated/data-contracts";
import { generateId } from "../../utils";

export function mapReceipt(receiptResponse: ReceiptResult): Receipt {
    return {
        items: receiptResponse.items.map(item => ({
            id: generateId(),
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unit_price,
            totalPrice: item.total_price,
            buyers: Array.from({length: item.quantity}, () => [])
        })),
        subTotal: receiptResponse.subtotal,
        tip: receiptResponse.tip,
        tax: receiptResponse.tax,
        totalPrice: receiptResponse.total
    }
}