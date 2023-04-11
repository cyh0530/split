import { Collapse, List } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ReceiptItem } from "../../models/receiptItem";
import { CheckItem } from "./CheckItem";

interface ScanSplitCheckProps {
  party: string[];
  items: ReceiptItem[];
}

export function ScanSplitCheck({ party, items }: ScanSplitCheckProps) {
  const handleEditItem = (item: ReceiptItem) => {};
  const handleAddNameToItem = (item: ReceiptItem, name: string) => {};
  return (
    <>
      <List>
        {items.map((item) => {
          if (item.quantity > 1) {
            return (
              <Collapse in={true}>
                {new Array<number>(item.quantity).map((num) => (
                  // Todo: identify specific item
                  <CheckItem item={item} party={party} />
                ))}
              </Collapse>
            );
          } else {
            <CheckItem item={item} party={party} />;
          }
        })}
      </List>
    </>
  );
}
