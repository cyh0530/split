import { Receipt } from "../models/receipt";
import { ScanApi } from "./Scan";
import { mapReceipt } from "./map/mapReceipt";

export async function uploadReceipt(
  receiptFile: File
): Promise<Receipt | null> {
  try {
    const response = await ScanApi.scanReceiptScanPost({
      receipt: receiptFile
    });
    return mapReceipt(response.data);
  } catch (err) {
    console.error(err)
    return null
  }
  
}
