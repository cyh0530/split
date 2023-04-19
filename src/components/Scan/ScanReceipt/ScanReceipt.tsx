import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { ScanContainer } from "../ScanContainer";

interface ScanReceiptProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export function ScanReceipt({ file, setFile }: ScanReceiptProps) {
  const [image, setImage] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <ScanContainer title="Upload Receipt">
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          alignContent: "space-around",
          justifyContent: "space-around",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box>
          <Button variant="contained" component="label">
            {image === "" ? "Upload Receipt" : "Replace Receipt"}
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleOnChange}
            />
          </Button>
        </Box>
        {image !== "" && (
          <Paper sx={{ width: "100%" }} elevation={3}>
            <img src={image} alt="receipt" width="100%" />
          </Paper>
        )}
      </Box>
    </ScanContainer>
  );
}
