import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ScanAddParty } from "./ScanAddParty";
import { localStoragePartyKey } from "../../constants";
import { storybookParties } from "../../stories/fakes/parties";

export default {
  title: "ScanAddParty",
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

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {};
