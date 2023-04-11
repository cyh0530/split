import { useState } from "react";
import { ScanSteps } from "./ScanSteps";
import { ScanReceipt } from "./ScanReceipt";
import { ScanSelectParty } from "./SelectParty";
import { ScanSplitCheck } from "./SplitCheck";
import { ScanResult } from "./ScanResult";
import { ReceiptItem } from "../models/receiptItem";

export function Scan() {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [checkItems, setCheckItems] = useState<ReceiptItem[]>([]);
  const [currentParty, setCurrentParty] = useState<string[]>([]);
  const [splitCheck, setSplitCheck] = useState();

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
      {currentStep === 2 && (
        <ScanSplitCheck party={currentParty} items={checkItems} />
      )}
      {currentStep === 3 && <ScanResult />}
    </>
  );
}
