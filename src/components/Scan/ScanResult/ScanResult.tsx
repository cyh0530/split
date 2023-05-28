import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { SplitCheck } from "../../../models/splitCheck";
import { ScanResultItem } from "./ScanResultItem";
import { Fragment } from "react";
import { ScanContainer } from "../ScanContainer";
import { round } from "../../../utils";
import { buildShareContent } from "@/utils/buildShareContent";

interface ScanResultProps {
  splitCheck: SplitCheck[];
}

export function ScanResult({ splitCheck }: ScanResultProps) {
  let total = 0;
  splitCheck.forEach((check) => {
    total += check.totalPrice;
  });
  total = round(total);

  const handleShare = () => {
    const shareData = buildShareContent(splitCheck)
    navigator.share(shareData)
  }

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          my: 2,
          textAlign: "center",
          width: "100%",
        }}
      >
        <Box>
          <Button variant="contained" color="primary" onClick={handleShare}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <ReplyIcon sx={{ transform: "rotateY(180deg)" }} />
              <Typography> Share</Typography>
            </Box>
          </Button>
        </Box>
        <Box>
          <a
            href="https://www.buymeacoffee.com/cyh0530"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              style={{ width: "50%", maxWidth: "217px" }}
            />
          </a>
        </Box>
      </Box>
    </ScanContainer>
  );
}
