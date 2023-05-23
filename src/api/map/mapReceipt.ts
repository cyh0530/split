import { Receipt } from "../../models";
import { ReceiptResult } from "../generated/data-contracts";
import { generateId, round } from "../../utils";

export function mapReceipt(receiptResponse: ReceiptResult): Receipt {
    const receipt: Receipt = {
        items: receiptResponse.items.filter(item => item.total_price > 0).map(item => ({
            id: generateId(),
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unit_price,
            totalPrice: round(item.quantity * item.unit_price),
            buyers: Array.from({length: item.quantity}, () => new Set<string>())
        })),
        subTotal: receiptResponse.subtotal,
        tip: receiptResponse.tip,
        tax: receiptResponse.tax,
        totalPrice: receiptResponse.total
    }
    
    return receipt
}