import { useEffect, useState } from "react";
import { ScanSteps } from "./ScanSteps";
import { UploadReceipt } from "./UploadReceipt/UploadReceipt";
import { ScanSelectParty } from "./SelectParty";
import { ScanSplitCheck } from "./SplitCheck";
import { ScanResult } from "./ScanResult/ScanResult";
import { SplitCheck } from "../../models/splitCheck";
import { Receipt } from "../../models/receipt";
import { calculateSplitCheck } from "../../utils/calculateSplitCheck";
import { Container } from "@mui/material";
import { fakeInitialReceipt } from "../../stories/fakes";
import _ from "lodash";

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

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
    setDisableNextStep(true);
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
    </Container>
  );
}
