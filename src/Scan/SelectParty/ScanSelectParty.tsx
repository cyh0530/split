import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment, useState } from "react";
import { ScanAddParty } from "./ScanAddParty";
import { usePartyLocalStorage } from "../../hooks/usePartyLocalStorage";

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
  const [localStorageParty, setLocalStorageParty] = usePartyLocalStorage();
  const [openAddPartyModal, setOpenAddPartyModal] = useState(false);
  const [newParty, setNewParty] = useState<string[]>([]);

  const handleDelete = (party: string[]) => {
    const nextLocalStorageParty = [...localStorageParty]
    var partyIndex = indexOfParty(nextLocalStorageParty, party);
    if (partyIndex !== -1) {
      const partiesAfterDelete = nextLocalStorageParty.splice(partyIndex, 1);
      setLocalStorageParty(partiesAfterDelete);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <List dense disablePadding>
          {localStorageParty.map((party) => (
            <Fragment key={party.join("-")}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton onClick={() => handleDelete(party)}>
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{
                  paddingY: 1
                }}
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
                  {/* <ListItemText sx={{width: "100%"}}> */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {party.map((name) => (
                        <Chip size="small" label={name} />
                      ))}
                    </Box>
                  {/* </ListItemText> */}
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        </List>
        <Button variant="outlined" onClick={() => setOpenAddPartyModal(true)}>
          Add Party
        </Button>
      </Box>
      <ScanAddParty
        open={openAddPartyModal}
        setOpen={setOpenAddPartyModal}
        newParty={newParty}
        setNewParty={setNewParty}
      />
    </>
  );
}
