import { useState } from "react";
import { ScanSteps } from "./ScanSteps";
import { ScanReceipt } from "./ScanReceipt";
import { ScanSelectParty } from "./SelectParty";
import { ScanSplitCheck } from "./ScanSplitCheck";
import { ScanResult } from "./ScanResult";

export function Scan() {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [currentParty, setCurrentParty] = useState<string[]>([]);

  const goToNextStep = () => setCurrentStep(currentStep + 1);
  return (
    <>
      <ScanSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
      {currentStep === 0 && <ScanReceipt file={file} setFile={setFile} />}
      {currentStep === 1 && (
        <ScanSelectParty
          currentParty={currentParty}
          setCurrentParty={setCurrentParty}
          goToNextStep={goToNextStep}
        />
      )}
      {currentStep === 2 && <ScanSplitCheck />}
      {currentStep === 3 && <ScanResult />}
    </>
  );
}
