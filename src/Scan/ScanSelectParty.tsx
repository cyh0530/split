import {
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Radio,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { ScanAddParty } from "./ScanAddParty";
import { getPartyFromLocalStorage } from "../utils/getPartyFromLocalStorage";
import { localStoragePartyKey } from "../constants";
import { setPartyToLocalStorage } from "../utils/setPartyToLocalStorage";
import { usePartyLocalStorage } from "../hooks/usePartyLocalStorage";

const parties = [
  ["Me", "James", "Kai", "Leo", "Vincent"],
  ["Me", "James", "Kai", "Leo"],
  ["Me", "Albert", "James", "Kai", "Leo", "Vincent"],
];

interface ScanSelectPartyProps {
  currentParty: string[];
  setCurrentParty: React.Dispatch<React.SetStateAction<string[]>>;
  goToNextStep: () => void;
}

const indexOfParty = (parties: string[][], party: string[]) => {
  parties.forEach((currentParty, index) => {
    if (currentParty.length === party.length) {
      const currentPartyCopy = [...currentParty];
      const partyCopy = [...party];
      var allEqual = true;
      for (let i = 0; i < currentPartyCopy.length; i += 1) {
        if (currentPartyCopy[i] !== partyCopy[i]) {
          allEqual = false;
        }
      }
      if (allEqual) {
        return index;
      }
    }
  });
  return -1;
};

export function ScanSelectParty({
  currentParty,
  setCurrentParty,
  goToNextStep,
}: ScanSelectPartyProps) {
  const parties = usePartyLocalStorage();
  const [openAddPartyModal, setOpenAddPartyModal] = useState(false);
  const [newParty, setNewParty] = useState<string[]>([]);

  const handleDelete = (party: string[]) => {
    var partyIndex = indexOfParty(parties, party);
    if (partyIndex !== -1) {
      const partiesAfterDelete = parties.splice(partyIndex, 1);
      setPartyToLocalStorage(partiesAfterDelete);
    }
  };

  return (
    <Box>
      <List>
        {parties.map((party) => (
          <ListItem
            key={party.join("-")}
            secondaryAction={
              <IconButton onClick={() => handleDelete(party)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton
              onClick={() => {
                setCurrentParty(party);
                goToNextStep();
              }}
            >
              <ListItemIcon>
                <Radio checked={currentParty === party} />
              </ListItemIcon>
              <ListItemText>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {party.map((name) => (
                    <Chip label={name} />
                  ))}
                </Box>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={() => setOpenAddPartyModal(true)}>Add Party</Button>
      <ScanAddParty
        open={openAddPartyModal}
        setOpen={setOpenAddPartyModal}
        newParty={newParty}
        setNewParty={setNewParty}
      />
    </Box>
  );
}
