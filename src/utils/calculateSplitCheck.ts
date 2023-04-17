import { Receipt } from "../models/receipt";
import { ReceiptItem } from "../models/receiptItem";
import { SplitCheck } from "../models/splitCheck";
import { round } from "./round";

export function calculateSplitCheck(
  party: string[],
  receipt: Receipt
): SplitCheck[] {
  const nameToItemsMap: { [key: string]: ReceiptItem[] } = {};
  party.forEach((name) => (nameToItemsMap[name] = []));

  receipt.items.forEach((item) => {
    const buyers = item.buyers;
    buyers.forEach((unitBuyers) => {
      unitBuyers.forEach((buyerName) => {
        const quantity = round(1 / unitBuyers.length);
        const totalPrice = round(item.unitPrice * quantity);
        const note = `Shared with ${unitBuyers.join(", ")}`;
        const buyerItem: ReceiptItem = {
          id: item.id,
          name: item.name,
          quantity: quantity,
          unitPrice: item.unitPrice,
          totalPrice: totalPrice,
          buyers: [unitBuyers],
          note: unitBuyers.length > 1 ? note : undefined,
        };
        nameToItemsMap[buyerName].push(buyerItem);
      });
    });
  });

  const result: SplitCheck[] = [];
  const receiptSubTotal = calculateSubTotal(receipt.items);
  const receiptTip = receipt.tip;
  const receiptTax = receipt.tax;
  const tipRate = receiptTip / receiptSubTotal;
  const taxRate = receiptTax / receiptSubTotal;
  Object.entries(nameToItemsMap).forEach(([name, items]) => {
    const buyerSubTotal = calculateSubTotal(items);
    const buyerTip = round(buyerSubTotal * tipRate);
    const buyerTax = round(buyerSubTotal * taxRate);
    const buyerTotal = round(buyerSubTotal + buyerTip + buyerTax);
    const splitCheck: SplitCheck = {
      name: name,
      items: items,
      subTotalPrice: buyerSubTotal,
      tip: buyerTip,
      tax: buyerTax,
      totalPrice: buyerTotal,
    };
    result.push(splitCheck);
  });

  result.sort((a, b) => a.name.localeCompare(b.name));

  return result;
}

function calculateSubTotal(items: ReceiptItem[]): number {
  let total = 0;
  items.forEach((item) => {
    total += item.totalPrice;
  });
  return total;
}
