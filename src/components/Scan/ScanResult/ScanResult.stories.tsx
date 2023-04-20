import type { Meta, StoryObj } from "@storybook/react";
import { ScanResult } from "./ScanResult";
import { fakeSplitCheckResults } from "../../../stories/fakes";
import { Box } from "@mui/material";

export default {
  title: "Scan Receipt/4 - Result",
  component: ScanResult,
  decorators: [
    (Story) => {
      return (
        <Box
          sx={({ breakpoints }) => ({
            margin: "auto",
            maxWidth: breakpoints.values.sm,
          })}
        >
          <Story />
        </Box>
      );
    },
  ],
} as Meta<typeof ScanResult>;

type Story = StoryObj<typeof ScanResult>;

export const Primary: Story = {
  args: {
    splitCheck: fakeSplitCheckResults,
  },
};
