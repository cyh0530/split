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
  ListItemText,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { usePartyLocalStorage } from "../../../hooks/usePartyLocalStorage";
import _ from "lodash";
import { CenterModal } from "../../CenterModal";

interface ScanAddPartyProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newParty: string[];
  setNewParty: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectParty: (party: string[]) => void;
}

export function ScanAddParty({
  open,
  setOpen,
  newParty,
  setNewParty,
  setSelectParty,
}: ScanAddPartyProps) {
  const [allNames, setAllNames] = useState<string[]>([]);
  const [newName, setNewName] = useState("");
  const [addError, setAddError] = useState(false);
  const [addHelperText, setAddHelperText] = useState("");
  const [localStorageParty, setLocalStorageParty] = usePartyLocalStorage();
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  useEffect(() => {
    var names = localStorageParty.flat();
    names = names.filter((item, index) => names.indexOf(item) === index);
    names.sort((a, b) =>
      a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
    );
    setAllNames(names);
  }, [localStorageParty]);

  const handleSetNewParty = (name: string) => {
    const nameIndex = newParty.indexOf(name);
    const nextNewParty = [...newParty];
    if (nameIndex === -1) {
      nextNewParty.push(name);
    } else {
      nextNewParty.splice(nameIndex, 1);
    }
    nextNewParty.sort((a, b) =>
      a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
    );
    setNewParty(nextNewParty);
  };

  const resetAddError = () => {
    setAddError(false);
    setAddHelperText("");
  };

  const handleAddName = () => {
    const nextAllNames = [...allNames];
    if (nextAllNames.includes(newName)) {
      setAddError(true);
      setAddHelperText("Name already exists");
      return;
    }
    nextAllNames.push(newName);
    nextAllNames.sort((a, b) =>
      a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
    );
    handleSetNewParty(newName);
    setAllNames(nextAllNames);
    setNewName("");
    resetAddError();
  };

  const handleSave = () => {
    let alreadyContains = false;
    localStorageParty.forEach((party) => {
      if (_.isEqual(party, newParty)) {
        alreadyContains = true;
      }
    });

    if (!alreadyContains) {
      const nextLocalStorageParty = [...localStorageParty];
      nextLocalStorageParty.unshift(newParty);
      setLocalStorageParty(nextLocalStorageParty);
      setShowSuccessSnackbar(true);
    }
    setSelectParty(newParty);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpen(false);
    setNewName("");
    resetAddError();
  };

  return (
    <>
      <CenterModal open={open}>
        <Box
          sx={{
            maxHeight: "600px",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              height: "100%",
              overflow: "scroll",
              width: "100%",
            }}
          >
            <Box sx={{ textAlign: "center", position: "relative" }}>
              <Typography variant="h6">Who is splitting the check</Typography>
              <IconButton
                sx={{ position: "absolute", right: 0, top: 0, padding: "5px" }}
                onClick={handleCloseModal}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ flex: 1, overflow: "auto" }}>
              <List dense disablePadding>
                {allNames.map((name) => (
                  <ListItem key={name} disableGutters>
                    <ListItemButton onClick={() => handleSetNewParty(name)}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={newParty.indexOf(name) !== -1}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText primary={name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <TextField
                size="small"
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
                placeholder="Add Name"
              />
              <Box>
                <Button variant="outlined" onClick={handleAddName}>
                  Add
                </Button>
              </Box>
            </Box>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </CenterModal>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={3000}
        open={showSuccessSnackbar}
        onClose={() => setShowSuccessSnackbar(false)}
      >
        <Alert severity="success">Added new party!</Alert>
      </Snackbar>
    </>
  );
}
