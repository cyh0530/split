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
import EditIcon from "@mui/icons-material/Edit";
import { Fragment, useState } from "react";
import { ScanAddParty } from "./ScanAddParty";
import { usePartyLocalStorage } from "../../../hooks/usePartyLocalStorage";
import { getPartyFromLocalStorage } from "../../../utils";
import _ from "lodash";
import { ScanContainer } from "../ScanContainer";

interface ScanSelectPartyProps {
  currentParty: string[];
  setCurrentParty: React.Dispatch<React.SetStateAction<string[]>>;
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
}: ScanSelectPartyProps) {
  const [, setLocalStorageParty] = usePartyLocalStorage();
  const [openAddPartyModal, setOpenAddPartyModal] = useState(false);
  const [newParty, setNewParty] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const localStorageParty = getPartyFromLocalStorage();

  const handleDelete = (party: string[]) => {
    const nextLocalStorageParty = [...localStorageParty];
    var partyIndex = indexOfParty(nextLocalStorageParty, party);
    if (partyIndex !== -1) {
      const partiesAfterDelete = nextLocalStorageParty.splice(partyIndex, 1);
      setLocalStorageParty(partiesAfterDelete);
    }
  };

  const handleSelectParty = (party: string[]) => {
    setCurrentParty(party);
  };

  const handleEdit = () => {};

  return (
    <ScanContainer
      title="Select Party"
      titleIcon={
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      }
    >
      <List dense disablePadding sx={{ paddingBottom: 12 }}>
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
                paddingY: 1,
              }}
            >
              <ListItemButton
                onClick={() => {
                  handleSelectParty(party);
                }}
              >
                <ListItemIcon>
                  <Radio checked={_.isEqual(currentParty, party)} />
                </ListItemIcon>
                <ListItemText>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {party.map((name) => (
                      <Chip size="small" key={name} label={name} />
                    ))}
                  </Box>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
      <Box
        sx={{
          position: "fixed",
          bottom: 70,
          left: "50%",
          translate: "-50%",
          textAlign: "center",
        }}
      >
        <Button
          sx={{ margin: "auto" }}
          variant="contained"
          onClick={() => setOpenAddPartyModal(true)}
        >
          Add Names
        </Button>
      </Box>
      <ScanAddParty
        open={openAddPartyModal}
        setOpen={setOpenAddPartyModal}
        newParty={newParty}
        setNewParty={setNewParty}
        setSelectParty={handleSelectParty}
      />
    </ScanContainer>
  );
}
