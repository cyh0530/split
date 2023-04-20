import { Meta, StoryObj } from "@storybook/react";
import { ScanSplitCheck } from "./ScanSplitCheck";
import { useState } from "react";
import { Receipt } from "../../../models/receipt";
import { fakeParties } from "../../../stories/fakes";
import { fakeReceipt } from "../../../stories/fakes";
import { Box } from "@mui/material";

export default {
  title: "Scan Receipt/3 - Split Check",
  component: ScanSplitCheck,
  decorators: [
    (Story, context) => {
      const [receiptState, setReceiptState] = useState<Receipt>(fakeReceipt);
      context.args.receipt = receiptState;
      context.args.setReceipt = setReceiptState;
      return (
        <Box
          sx={({ breakpoints }) => ({
            margin: "auto",
            maxWidth: breakpoints.values.sm,
          })}
        >
          {" "}
          <Story />
        </Box>
      );
    },
  ],
} as Meta<typeof ScanSplitCheck>;

type Story = StoryObj<typeof ScanSplitCheck>;

export const Primary: Story = {
  args: {
    party: fakeParties[0],
  },
};
