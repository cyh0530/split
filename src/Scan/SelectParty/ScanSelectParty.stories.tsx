import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ScanSelectParty } from "./ScanSelectParty";
import { localStoragePartyKey } from "../../constants";
import { storybookParties } from "../../stories/fakes/parties";

export default {
  title: "ScanSelectParty",
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

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {};
