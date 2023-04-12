import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState } from "react";

interface CheckSummaryItemProps {
  summaryType: string;
  value: number;
  updateItem: (summaryType: string, value: number) => void;
}

export function CheckSummaryItem({
  summaryType,
  value,
  updateItem,
}: CheckSummaryItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [editSubmitEnabled, setEditSubmitEnabled] = useState(false);
  const [valueError, setValueError] = useState(false);
  const valueRef = useRef<HTMLInputElement>(null);

  const handleEditItem = () => {
    const newValue = valueRef.current?.value;
    if (!newValue || parseFloat(newValue) <= 0) {
      return;
    }

    updateItem(summaryType, parseFloat(newValue));
    setIsEdit(false);
  };

  const handleItemChange = () => {
    const newValue = valueRef.current?.value;

    if (!newValue || parseFloat(newValue) <= 0) {
      setEditSubmitEnabled(true);
      setValueError(true);
      return;
    }

    setEditSubmitEnabled(false);
  };

  return (
    <ListItem
      secondaryAction={
        !isEdit && (
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        )
      }
    >
      <ListItemText
        primary={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{summaryType}</Typography>
            <Box>
              {isEdit ? (
                <>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      error={valueError}
                      ref={valueRef}
                      type="number"
                      label={"Unit Price"}
                      defaultValue={value}
                      size="small"
                      helperText={valueError && "Please enter a valid number"}
                      onChange={handleItemChange}
                    />
                  </Box>
                  <IconButton
                    color="success"
                    onClick={handleEditItem}
                    disabled={editSubmitEnabled}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setIsEdit(false)}>
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <Typography>{value}</Typography>
              )}
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
}
