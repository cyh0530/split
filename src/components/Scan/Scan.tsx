import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
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
import { Receipt, emptyReceipt } from "../../models/receipt";
import { calculateSplitCheck } from "../../utils/calculateSplitCheck";
import { uploadReceipt } from "../../api/uploadReceipt";
import { SnackbarContent } from "../../models/snackbar";
import { CenterModal } from "../CenterModal";
import { healthCheck } from "../../api/healthCheck";
import { Link } from "react-router-dom";

const steps = [
  "Upload Receipt",
  "Select Party",
  "Split the Check",
  "Split Result",
];

export function Scan() {
  const [currentStep, setCurrentStep] = useState(0);
  const [disableNextStep, setDisableNextStep] = useState(true);
  const [disablePrevStep, setDisablePrevStep] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [receipt, setReceipt] = useState<Receipt>(emptyReceipt);
  const [party, setCurrentParty] = useState<string[]>([]);
  const [splitCheck, setSplitCheck] = useState<SplitCheck[]>([]);

  const [snackbar, setSnackbar] = useState<SnackbarContent>({
    open: false,
    severity: "error",
    message: "",
  });

  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);
  const [isUnhealthy, setIsUnhealthy] = useState(false);

  const resetReceiptBuyer = useCallback(() => {
    const nextReceipt = _.cloneDeep(receipt);
    nextReceipt.items.forEach((item) => {
      const quantity = item.quantity;
      item.buyers = Array.from({ length: quantity }, () => new Set<string>());
    });
    setReceipt(nextReceipt);
  }, [receipt, setReceipt]);

  // reset receipt if file changes
  useEffect(() => {
    setReceipt(emptyReceipt);
  }, [file]);

  // reset receipt buyers if party changes
  useEffect(() => {
    resetReceiptBuyer();
  }, [party]);

  // recalculate split check if receipt value changes
  useEffect(() => {
    const newSplitCheck = calculateSplitCheck(party, receipt);
    setSplitCheck(newSplitCheck);
  }, [party, receipt]);

  const goToNextStep = async () => {
    if (currentStep === steps.length - 1) {
      reset();
      return;
    }
    // if no receipt data present, upload and parse the receipt
    if (
      currentStep === 0 &&
      _.isEqual(receipt, emptyReceipt) &&
      !(await sendReceipt())
    ) {
      return;
    }
    setCurrentStep(currentStep + 1);
    if (currentStep + 1 !== steps.length - 1) {
      setDisableNextStep(true);
    }
  };

  const goToPrevStep = () => setCurrentStep(currentStep - 1);

  const reset = () => {
    setCurrentStep(0);
    setDisableNextStep(true);
    setDisablePrevStep(true);
    setFile(null);
    setReceipt(emptyReceipt);
    setCurrentParty([]);
    setSplitCheck([]);
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
    setSnackbar({
      open: true,
      severity: "success",
      message: "Receipt parsed!",
    });
    setReceipt(receiptResult);
    setIsUploadingReceipt(false);
    return true;
  };

  useEffect(() => {
    const callHeatlhCheck = async () => {
      const healthy = await healthCheck();
      if (!healthy) {
        setIsUnhealthy(true);
      }
    };
    callHeatlhCheck();
  }, []);

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
            Parsing receipt...
          </Typography>
          <CircularProgress />
        </Box>
      </CenterModal>
      <CenterModal open={isUnhealthy}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">
            Sorry, the service is not available
          </Typography>
          <Typography variant="body1">
            Please use <Link to="/manual">this page</Link> to split the check
          </Typography>
        </Box>
      </CenterModal>
    </Container>
  );
}
