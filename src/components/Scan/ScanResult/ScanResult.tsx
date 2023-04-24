import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { SplitCheck } from "../../../models/splitCheck";
import { ScanResultItem } from "./ScanResultItem";
import { Fragment } from "react";
import { ScanContainer } from "../ScanContainer";
import { round } from "../../../utils";

interface ScanResultProps {
  splitCheck: SplitCheck[];
}

const buyMeCoffeeButtonHeightRatio = 60/217
export function ScanResult({ splitCheck }: ScanResultProps) {
  let total = 0;
  splitCheck.forEach((check) => {
    total += check.totalPrice;
  });
  total = round(total);
  return (
    <ScanContainer title="Result">
      <List>
        {splitCheck.map((buyer) => (
          <Fragment key={buyer.name}>
            <ScanResultItem buyer={buyer} />
          </Fragment>
        ))}
        <Divider />
        <ListItem>
          <ListItemText>Total:</ListItemText>
          <Typography>${total}</Typography>
        </ListItem>
      </List>
      <Box sx={{ my: 2, textAlign: "center", width: "100%" }}>
        <a href="https://www.buymeacoffee.com/cyh0530" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            style={{ width: "50%", maxWidth: "217px" }}
          />
        </a>
      </Box>
    </ScanContainer>
  );
}
