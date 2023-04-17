import { useTheme } from "@mui/material/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { MobileStepper, Button } from "@mui/material";
import React from "react";

interface ScanStepsProps {
  currentStep: number;
  maxStep: number;
  handleNext: (e: React.MouseEvent) => void;
  handleBack: (e: React.MouseEvent) => void;
}

export function ScanSteps({
  currentStep,
  maxStep,
  handleNext,
  handleBack,
}: ScanStepsProps) {
  const theme = useTheme();
  return (
    <MobileStepper
      sx={({ breakpoints }) => ({
        width: "100%",
        margin: "auto",
        maxWidth: breakpoints.values.sm,
      })}
      variant="text"
      steps={maxStep}
      activeStep={currentStep}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={currentStep === maxStep - 1}
        >
          Next
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={currentStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
