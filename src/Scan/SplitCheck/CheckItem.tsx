import { Box, Chip, IconButton, ListItem, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ReceiptItem } from "../../models/receiptItem";

interface CheckItem {
  item: ReceiptItem;
  party: string[];
}

export function CheckItem({ item, party }: CheckItem) {
  const handleEditItem = (item: ReceiptItem) => {};
  const handleAddNameToItem = (item: ReceiptItem, name: string) => {}

  return (
    <ListItem
      onClick={() => handleEditItem(item)}
      secondaryAction={
        <IconButton>
          <EditIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={item.name}
        secondary={
          <Box>
            {party.map((name) => (
              <Chip
                label={name}
                onClick={() => handleAddNameToItem(item, name)}
              />
            ))}
          </Box>
        }
      />
    </ListItem>
  );
}
