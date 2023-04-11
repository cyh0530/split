import {
  Alert,
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Modal,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { localStoragePartyKey } from "../constants";
import { getPartyFromLocalStorage } from "../utils/getPartyFromLocalStorage";

interface ScanAddPartyProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newParty: string[];
  setNewParty: React.Dispatch<React.SetStateAction<string[]>>;
}

const parties = [
  ["Me", "James", "Kai", "Leo", "Vincent"],
  ["Me", "James", "Kai", "Leo"],
  ["Me", "Albert", "James", "Kai", "Leo", "Vincent"],
];

export function ScanAddParty({
  open,
  setOpen,
  newParty,
  setNewParty,
}: ScanAddPartyProps) {
  const [newName, setNewName] = useState("");
  const [addError, setAddError] = useState(false);
  const [addHelperText, setAddHelperText] = useState("");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  var names = parties.flat();
  names = names.filter((item, index) => names.indexOf(item) === index);
  names.sort();

  const handleSetNewParty = (name: string) => {
    const nameIndex = newParty.indexOf(name);
    const nextNewParty = [...newParty];
    if (nameIndex === -1) {
      nextNewParty.push(name);
    } else {
      nextNewParty.splice(nameIndex, 1);
    }
    nextNewParty.sort();
    setNewParty(nextNewParty);
  };

  const resetAddError = () => {
    setAddError(false);
    setAddHelperText("");
  };

  const handleAddName = () => {
    if (names.includes(newName)) {
      setAddError(true);
      setAddHelperText("Name already exists");
      return;
    }
    names.push(newName);
    setNewName("");
    resetAddError();
  };

  const handleSave = () => {
    var partiesJson = getPartyFromLocalStorage();
    partiesJson.unshift(newParty);
    localStorage.setItem(localStoragePartyKey, JSON.stringify(partiesJson));
    setShowSuccessSnackbar(true);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpen(false);
    setNewName("");
    resetAddError();
  };

  return (
    <>
      <Modal open={open}>
        <>
          <Box sx={{ display: "flex", justifyItems: "end" }}>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {names.map((name) => (
              <ListItem key={name}>
                <ListItemButton onClick={() => handleSetNewParty(name)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={newParty.indexOf(name) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex" }}>
            <TextField
              value={newName}
              helperText={addHelperText}
              error={addError}
              onChange={(e) => {
                setNewName(e.target.value);
                resetAddError();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddName();
                }
              }}
            />
            <Button variant="outlined" onClick={handleAddName}>
              Add
            </Button>
          </Box>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </>
      </Modal>
      <Snackbar
        autoHideDuration={3000}
        open={showSuccessSnackbar}
        onClose={() => setShowSuccessSnackbar(false)}
      >
        <Alert severity="success">Added new party!</Alert>
      </Snackbar>
    </>
  );
}
