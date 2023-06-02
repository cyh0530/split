import { Box, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { useEffect, useState } from "react";
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

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    setDisableNextStep(image === "");
  }, [image]);

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
        <Button
          component="label"
          variant="contained"
          size="large"
        >
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
