import { Box, Button } from "@mui/material";
import { useState } from "react";
import { ScanContainer } from "../ScanContainer";

interface UploadReceiptProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setDisableNextStep: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UploadReceipt({
  file,
  setFile,
  setDisableNextStep,
}: UploadReceiptProps) {
  const [image, setImage] = useState<string>(
    file ? URL.createObjectURL(file) : ""
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
      setImage(URL.createObjectURL(file));
      setDisableNextStep(false);
    } else {
      setDisableNextStep(true);
    }
  };

  return (
    <ScanContainer title="Upload Receipt">
      <Box
        sx={{
          py: 2,
          px: 1,
        }}
      >
        {image !== "" && <img src={image} alt="receipt" width="100%" />}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 70,
          left: "50%",
          translate: "-50%",
          textAlign: "center",
        }}
      >
        <Button component="label" variant="contained">
          {image === "" ? "Upload Receipt" : "Replace Receipt"}
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleOnChange}
          />
        </Button>
      </Box>
    </ScanContainer>
  );
}
