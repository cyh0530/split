import { useEffect, useState } from "react";
import { ScanSteps } from "./ScanSteps";
import { ScanReceipt } from "./ScanReceipt/ScanReceipt";
import { ScanSelectParty } from "./SelectParty";
import { ScanSplitCheck } from "./SplitCheck";
import { ScanResult } from "./ScanResult/ScanResult";
import { SplitCheck } from "../models/splitCheck";
import { Receipt } from "../models/receipt";
import { calculateSplitCheck } from "../utils/calculateSplitCheck";
import { Box, Typography } from "@mui/material";

const steps = ["Scan", "Party", "Split", "Result"];

export function Scan() {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [receipt, setReceipt] = useState<Receipt>({
    items: [],
    subTotal: 0,
    tip: 0,
    tax: 0,
    totalPrice: 0,
  });
  const [party, setCurrentParty] = useState<string[]>([]);
  const [splitCheck, setSplitCheck] = useState<SplitCheck[]>([]);

  useEffect(() => {
    const newSplitCheck = calculateSplitCheck(party, receipt);
    setSplitCheck(newSplitCheck);
  }, [receipt]);

  const goToNextStep = () => setCurrentStep(currentStep + 1);
  const goToPrevStep = () => setCurrentStep(currentStep - 1);
  return (
    <Box
      sx={({ breakpoints }) => ({
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        height:  "calc(100vh - 48px)",
        overflow: "auto",
        width: "100%",
        position: "static",
        maxWidth: breakpoints.values.sm,
      })}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">{steps[currentStep]}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {currentStep === 0 && <ScanReceipt file={file} setFile={setFile} />}
        {currentStep === 1 && (
          <ScanSelectParty
            currentParty={party}
            setCurrentParty={setCurrentParty}
            goToNextStep={goToNextStep}
          />
        )}
        {currentStep === 2 && (
          <ScanSplitCheck
            party={party}
            receipt={receipt}
            setReceipt={setReceipt}
          />
        )}
        {currentStep === 3 && <ScanResult splitCheck={splitCheck} />}
      </Box>
      <ScanSteps
        currentStep={currentStep}
        maxStep={steps.length}
        handleNext={goToNextStep}
        handleBack={goToPrevStep}
      />
    </Box>
  );
}
