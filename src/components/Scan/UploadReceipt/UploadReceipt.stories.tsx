import { Meta, StoryObj } from "@storybook/react";
import { UploadReceipt } from "./UploadReceipt";
import { useState } from "react";

export default {
  title: "Scan Receipt/1 - Upload Receipt",
  component: UploadReceipt,
  decorators: [
    (Story, context) => {
      const [file, setFile] = useState<File | null>(null);
      context.args.file = file;
      context.args.setFile = setFile;
      return <Story />
    },
  ],
} as Meta<typeof UploadReceipt>;

type Story = StoryObj<typeof UploadReceipt>;

export const Default: Story = {};
