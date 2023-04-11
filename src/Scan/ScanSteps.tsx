import { StepButton, Step, Stepper, Typography } from "@mui/material";

interface ScanStepsProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export function ScanSteps({ currentStep, setCurrentStep }: ScanStepsProps) {
  const steps = ["Scan", "Party", "Split", "Result"];
  return (
    <Stepper>
      {steps.map((step, index) => (
        <Step
          key={step}
          active={index + 1 === currentStep}
          completed={index + 1 <= currentStep}
        >
          <StepButton onClick={() => setCurrentStep(index)}>
            <Typography variant="caption">{step}</Typography>
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
}
