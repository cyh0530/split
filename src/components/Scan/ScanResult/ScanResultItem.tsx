import {
  ListItem,
  ListItemText,
  Typography,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { SplitCheck } from "../../../models/splitCheck";
import { round } from "@/utils";

interface ScanResultItemProps {
  buyer: SplitCheck;
}

export function ScanResultItem({ buyer }: ScanResultItemProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const taxPercentage = round((buyer.tax / buyer.subTotalPrice) * 100) || 0;
  const tipPercentage = round((buyer.tip / buyer.subTotalPrice) * 100) || 0;

  return (
    <>
      <ListItemButton divider onClick={handleClick}>
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <ListItemText
          primary={buyer.name}
        />
        <Typography>${buyer.totalPrice}</Typography>
      </ListItemButton>
      <Collapse in={open}>
        <List component="div" dense sx={{ pl: 4 }}>
          {buyer.items.map((item) => (
            <ListItem key={item.id}>
              <ListItemIcon>
                <Typography>{item.quantity}</Typography>
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ variant: "body2" }}
                secondary={item.note}
                secondaryTypographyProps={{ variant: "body2" }}
                sx={{ pr: 1 }}
              />
              <Typography variant="body2">${item.totalPrice}</Typography>
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary="Subtotal"
              primaryTypographyProps={{ variant: "body2" }}
              sx={{ pr: 1 }}
            />
            <Typography variant="body2">${buyer.subTotalPrice}</Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary={`Tax (${taxPercentage}%)`}
              primaryTypographyProps={{ variant: "body2" }}
              sx={{ pr: 1 }}
            />
            <Typography variant="body2">${buyer.tax}</Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary={`Tip (${tipPercentage}%)`}
              primaryTypographyProps={{ variant: "body2" }}
              sx={{ pr: 1 }}
            />
            <Typography variant="body2">${buyer.tip}</Typography>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
