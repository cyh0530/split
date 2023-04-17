import { Meta, StoryObj } from "@storybook/react";
import { ScanReceipt } from "./ScanReceipt";
import { useState } from "react";

export default {
  title: "Scan Receipt/1 - Scan Receipt",
  component: ScanReceipt,
  decorators: [
    (Story, context) => {
      const [file, setFile] = useState<File | null>(null);
      context.args.file = file;
      context.args.setFile = setFile;
      return <Story />
    },
  ],
} as Meta<typeof ScanReceipt>;

type Story = StoryObj<typeof ScanReceipt>;

export const Default: Story = {};
