import type { Meta, StoryObj } from "@storybook/react";
import { ScanResultItem } from "./ScanResultItem";
import { fakeSplitCheckResults } from "../../../stories/fakes";

export default {
    title: "Scan Receipt/4 - Result Item",
    component: ScanResultItem,
} as Meta<typeof ScanResultItem>;

type Story = StoryObj<typeof ScanResultItem>;

export const Primary: Story = {
    args: {
        buyer: fakeSplitCheckResults[0]
    }
}