import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { ScanSteps } from "./ScanSteps";
import { UploadReceipt } from "./UploadReceipt/UploadReceipt";
import { ScanSelectParty } from "./SelectParty";
import { ScanSplitCheck } from "./SplitCheck";
import { ScanResult } from "./ScanResult/ScanResult";
import { SplitCheck } from "../../models/splitCheck";
import { Receipt } from "../../models/receipt";
import { calculateSplitCheck } from "../../utils/calculateSplitCheck";
import { fakeInitialReceipt } from "../../stories/fakes";
import { uploadReceipt } from "../../api/uploadReceipt";
import { SnackbarContent } from "../../models/snackbar";
import { CenterModal } from "../CenterModal";

const steps = [
  "Upload Receipt",
  "Select Party",
  "Split the Check",
  "Split Result",
];

export function Scan() {
  const [currentStep, setCurrentStep] = useState(0);
  const [disableNextStep, setDisableNextStep] = useState(false);
  const [disablePrevStep, setDisablePrevStep] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [receipt, setReceipt] = useState<Receipt>(fakeInitialReceipt);
  const [party, setCurrentParty] = useState<string[]>([]);
  const [splitCheck, setSplitCheck] = useState<SplitCheck[]>([]);

  const [snackbar, setSnackbar] = useState<SnackbarContent>({
    open: false,
    severity: "error",
    message: "",
  });

  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);

  useEffect(() => {
    // reset receipt buyers
    const nextReceipt = _.cloneDeep(receipt);
    nextReceipt.items.forEach((item) => {
      const quantity = item.quantity;
      const newBuyers = [];
      for (let i = 0; i < quantity; i += 1) {
        newBuyers.push([]);
      }
      item.buyers = newBuyers;
    });
    setReceipt(nextReceipt);
  }, [party]);

  useEffect(() => {
    const newSplitCheck = calculateSplitCheck(party, receipt);
    setSplitCheck(newSplitCheck);
  }, [party, receipt]);

  const goToNextStep = async () => {
    if (currentStep === 0 && !(await sendReceipt())) {
      return;
    }
    setCurrentStep(currentStep + 1);
    setDisableNextStep(true);
  };

  const sendReceipt = async (): Promise<boolean> => {
    if (!file) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "No receipt uploaded. Please upload a receipt.",
      });
      return false;
    }
    setIsUploadingReceipt(true);
    const receiptResult = await uploadReceipt(file);
    if (!receiptResult) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to parse receipt. Please try again.",
      });
      setIsUploadingReceipt(false);
      return false;
    }
    setReceipt(receiptResult);
    setIsUploadingReceipt(false);
    return true;
  };

  const goToPrevStep = () => setCurrentStep(currentStep - 1);
  return (
    <Container maxWidth="sm" disableGutters>
      {currentStep === 0 && (
        <UploadReceipt
          file={file}
          setFile={setFile}
          setDisableNextStep={setDisableNextStep}
        />
      )}
      {currentStep === 1 && (
        <ScanSelectParty
          currentParty={party}
          setCurrentParty={setCurrentParty}
          setDisableNextStep={setDisableNextStep}
        />
      )}
      {currentStep === 2 && (
        <ScanSplitCheck
          party={party}
          receipt={receipt}
          setReceipt={setReceipt}
          setDisableNextStep={setDisableNextStep}
          setDisablePrevStep={setDisablePrevStep}
        />
      )}
      {currentStep === 3 && <ScanResult splitCheck={splitCheck} />}
      <ScanSteps
        currentStep={currentStep}
        maxStep={steps.length}
        disableNextStep={disableNextStep}
        disablePrevStep={disablePrevStep}
        handleNext={goToNextStep}
        handleBack={goToPrevStep}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => {
          setSnackbar({
            ...snackbar,
            open: false,
          });
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
      <CenterModal open={isUploadingReceipt}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Uploading and parsing receipt...
          </Typography>
          <CircularProgress />
        </Box>
      </CenterModal>
    </Container>
  );
}
