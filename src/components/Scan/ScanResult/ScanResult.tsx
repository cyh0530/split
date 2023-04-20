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
export function ScanResult({ splitCheck }: ScanResultProps) {
  let total = 0;
  splitCheck.forEach((check) => {
    total += check.totalPrice;
  });
  total = round(total)
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
    </ScanContainer>
  );
}
