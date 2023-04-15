import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { SplitCheck } from "../../models/splitCheck";
import { ScanResultItem } from "./ScanResultItem";
import { Fragment } from "react";

interface ScanResultProps {
  splitCheck: SplitCheck[];
}
export function ScanResult({ splitCheck }: ScanResultProps) {
  return (
    <Box>
      <List>
        {splitCheck.map((buyer) => (
          <Fragment key={buyer.name}>
            <ScanResultItem buyer={buyer} />
          </Fragment>
        ))}
        <Divider />
        <ListItem>
          <ListItemText>Total:</ListItemText>
          <Typography>$123</Typography>
        </ListItem>
      </List>
    </Box>
  );
}
