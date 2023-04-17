import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ScanSelectParty } from "./ScanSelectParty";
import { localStoragePartyKey } from "../../constants";
import { storybookParties } from "../../stories/fakes/parties";

export default {
  title: "Scan Receipt/2 - Select Party",
  component: ScanSelectParty,
  decorators: [
    (Story, context) => {
      localStorage.setItem(
        localStoragePartyKey,
        JSON.stringify(storybookParties)
      );
      const [currentParty, setCurrentParty] = useState<string[]>([]);
      context.args.currentParty = currentParty;
      context.args.setCurrentParty = setCurrentParty;
      context.args.goToNextStep = () => {};
      return <Story />;
    },
  ],
} as Meta<typeof ScanSelectParty>;

type Story = StoryObj<typeof ScanSelectParty>;

export const Primary: Story = {};