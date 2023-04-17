import {
  Box,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { round } from "../../utils";

interface CheckSummaryItemProps {
  isEdit: boolean;
  summaryType: string;
  subTotal: number;
  value: number;
  updateItem: (summaryType: string, value: number) => void;
}

export function CheckSummaryItem({
  isEdit,
  summaryType,
  subTotal,
  value,
  updateItem,
}: CheckSummaryItemProps) {
  const [valueError, setValueError] = useState(false);
  const valueRef = useRef<HTMLInputElement>(null);

  const handleItemChange = () => {
    const newValue = valueRef.current?.value;
    if (!newValue || parseFloat(newValue) <= 0) {
      setValueError(true);
      return;
    }
    updateItem(summaryType, parseFloat(newValue));
  };

  const summaryPercentage = round((value / subTotal) * 100)

  return (
    <ListItem dense>
      <ListItemText>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">
            {summaryType} ({summaryPercentage}%)
          </Typography>
          {isEdit ? (
            <Box display="flex" alignItems="baseline" gap={0.5}>
              <Typography>$</Typography>
              <TextField
                error={valueError}
                inputRef={valueRef}
                type="number"
                label={summaryType}
                defaultValue={value}
                size="small"
                helperText={valueError && "Please enter a valid number"}
                onChange={handleItemChange}
                variant="standard"
                sx={{ width: 50 }}
              />
            </Box>
          ) : (
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              ${value}
            </Typography>
          )}
        </Box>
      </ListItemText>
    </ListItem>
  );
}
