import { useEffect, useState } from "react";
import { ScanSteps } from "./ScanSteps";
import { ScanReceipt } from "./ScanReceipt";
import { ScanSelectParty } from "./SelectParty";
import { ScanSplitCheck } from "./SplitCheck";
import { ScanResult } from "./ScanResult/ScanResult";
import { SplitCheck } from "../models/splitCheck";
import { Receipt } from "../models/receipt";
import { calculateSplitCheck } from "../utils/calculateSplitCheck";

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
    setSplitCheck(newSplitCheck)
  }, [receipt])

  const goToNextStep = () => setCurrentStep(currentStep + 1);
  return (
    <>
      <ScanSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
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
    </>
  );
}
