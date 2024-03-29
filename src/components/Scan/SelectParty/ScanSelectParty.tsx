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
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment, useEffect, useState } from "react";
import { ScanAddParty } from "./ScanAddParty";
import { usePartyLocalStorage } from "../../../hooks/usePartyLocalStorage";
import { getPartyFromLocalStorage } from "../../../utils";
import _ from "lodash";
import { ScanContainer } from "../ScanContainer";

interface ScanSelectPartyProps {
  currentParty: string[];
  setCurrentParty: React.Dispatch<React.SetStateAction<string[]>>;
  setDisableNextStep: React.Dispatch<React.SetStateAction<boolean>>;
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
  setDisableNextStep,
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

  useEffect(() => {
    if (isEdit || currentParty.length === 0) {
      setDisableNextStep(true);
    } else {
      setDisableNextStep(false);
    }
  }, [isEdit, currentParty, setDisableNextStep]);

  return (
    <ScanContainer
      title="Select Party"
      titleIcon={
        <IconButton onClick={handleEdit}>
          {isEdit ? <CheckIcon color="success" /> : <EditIcon />}
        </IconButton>
      }
    >
      {localStorageParty.length === 0 && (
        <>
          <Typography sx={{ mt: 1 }} variant="body1" textAlign="center">
            Select who is splitting the receipt with you
          </Typography>
          <Typography variant="body1" textAlign="center">
            Click "Add Names" to add people
          </Typography>
        </>
      )}
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
                      <Chip key={name} label={name} />
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
