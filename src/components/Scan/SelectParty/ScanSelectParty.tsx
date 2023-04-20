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
import CheckIcon from "@mui/icons-material/Check";
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
  let partyIndex = -1;
  parties.forEach((currentParty, index) => {
    if (_.isEqual(party, currentParty)) {
      partyIndex = index;
    }
  });
  return partyIndex;
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
    var partyIndex = indexOfParty(localStorageParty, party);
    const nextLocalStorageParty = [...localStorageParty];
    if (partyIndex !== -1) {
      nextLocalStorageParty.splice(partyIndex, 1);
      setLocalStorageParty(nextLocalStorageParty);
    }
  };

  const handleSelectParty = (party: string[]) => {
    setCurrentParty(party);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <ScanContainer
      title="Select Party"
      titleIcon={
        <IconButton onClick={handleEdit}>
          {isEdit ? <CheckIcon color="success" /> : <EditIcon />}
        </IconButton>
      }
    >
      <List dense disablePadding sx={{ paddingBottom: 12 }}>
        {localStorageParty.map((party) => (
          <Fragment key={party.join("-")}>
            <ListItem
              disablePadding
              secondaryAction={
                isEdit ? (
                  <IconButton onClick={() => handleDelete(party)}>
                    <DeleteIcon />
                  </IconButton>
                ) : null
              }
              sx={{
                paddingY: 1,
              }}
            >
              <ListItemButton
                onClick={() => {
                  isEdit ? handleDelete(party) : handleSelectParty(party);
                }}
              >
                <ListItemIcon>
                  <Box sx={{ visibility: isEdit ? "hidden" : "visible" }}>
                    <Radio checked={_.isEqual(currentParty, party)} />
                  </Box>
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
