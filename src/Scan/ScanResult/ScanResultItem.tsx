import {
  ListItem,
  ListItemText,
  Box,
  Typography,
  Collapse,
  List,
  ListItemButton,
} from "@mui/material";
import { useState } from "react";
import { SplitCheck } from "../../models/splitCheck";

interface ScanResultItemProps {
  user: SplitCheck;
}

export function ScanResultItem({ user }: ScanResultItemProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton key={user.name} onClick={handleClick}>
        <ListItemText
          primary={
            <Box sx={{ display: "flex", justifyItems: "center" }}>
              <Typography>{user.name}</Typography>
              <Typography>${user.totalPrice}</Typography>
            </Box>
          }
          secondary={`Tax: ${user.tax}, Tip: ${user.tip}`}
        />
      </ListItemButton>
      <Collapse in={open}>
        <List component="div">
          {user.items.map((item) => (
            <ListItem>
              <ListItemText
                primary={`${item.name} * ${item.quantity} = ${item.price}`}
                secondary={item.note}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}
