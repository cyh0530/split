import {
  ListItem,
  ListItemText,
  Typography,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { SplitCheck } from "../../../models/splitCheck";


interface ScanResultItemProps {
  buyer: SplitCheck;
}

export function ScanResultItem({ buyer }: ScanResultItemProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton divider onClick={handleClick}>
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <ListItemText
          primary={buyer.name}
          secondary={`Tax: ${buyer.tax}, Tip: ${buyer.tip}`}
        />
        <Typography>${buyer.totalPrice}</Typography>
      </ListItemButton>
      <Collapse in={open}>
        <List component="div" dense sx={{ pl: 4 }}>
          {buyer.items.map((item) => (
            <ListItem>
              <ListItemIcon>
                {/* <Fastfood /> */}
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
        </List>
      </Collapse>
    </>
  );
}
