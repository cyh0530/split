import { useEffect, useState } from "react";
import { ScanSteps } from "./ScanSteps";
import { ScanReceipt } from "./ScanReceipt/ScanReceipt";
import { ScanSelectParty } from "./SelectParty";
import { ScanSplitCheck } from "./SplitCheck";
import { ScanResult } from "./ScanResult/ScanResult";
import { SplitCheck } from "../../models/splitCheck";
import { Receipt } from "../../models/receipt";
import { calculateSplitCheck } from "../../utils/calculateSplitCheck";
import { Box, Container, Typography } from "@mui/material";

const steps = [
  "Upload Receipt",
  "Select Party",
  "Split the Check",
  "Split Result",
];

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
  }, [party, receipt]);

  const goToNextStep = () => setCurrentStep(currentStep + 1);
  const goToPrevStep = () => setCurrentStep(currentStep - 1);
  return (
    <Container maxWidth="sm" disableGutters>
      {currentStep === 0 && <ScanReceipt file={file} setFile={setFile} />}
      {currentStep === 1 && (
        <ScanSelectParty
          currentParty={party}
          setCurrentParty={setCurrentParty}
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
      <ScanSteps
        currentStep={currentStep}
        maxStep={steps.length}
        handleNext={goToNextStep}
        handleBack={goToPrevStep}
      />
    </Container>
  );
}
