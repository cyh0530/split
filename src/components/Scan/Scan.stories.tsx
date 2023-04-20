import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { Scan } from "./Scan";

export default {
  title: "Scan Receipt/Scan",
  component: Scan,
  decorators: [
    (Story) => {
      return (
        <Box sx={{ height: "100vh" }}>
          <Story />
        </Box>
      );
    },
  ],
} as Meta<typeof Scan>;

type Story = StoryObj<typeof Scan>;

export const Default: Story = {};
