import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ScanAddParty } from "./ScanAddParty";
import { localStoragePartyKey } from "../../constants";
import { storybookParties } from "../../stories/fakes/parties";

export default {
  title: "Scan Receipt/2 - Add Party",
  component: ScanAddParty,
  decorators: [
    (Story, context) => {
      localStorage.setItem(
        localStoragePartyKey,
        JSON.stringify(storybookParties)
      );
      const [open, setOpen] = useState(true);
      const [newParty, setNewParty] = useState<string[]>(["me"]);
      context.args.open = open;
      context.args.setOpen = setOpen;
      context.args.newParty = newParty;
      context.args.setNewParty = setNewParty;
      return <Story />;
    },
  ],
} as Meta<typeof ScanAddParty>;

type Story = StoryObj<typeof ScanAddParty>;

export const Primary: Story = {};
