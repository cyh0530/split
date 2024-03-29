import { useTheme } from "@mui/material/styles";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  RestartAlt,
} from "@mui/icons-material";
import { Button, Paper, Box } from "@mui/material";
import React from "react";

interface ScanStepsProps {
  currentStep: number;
  maxStep: number;
  disableNextStep: boolean;
  disablePrevStep: boolean;
  handleNext: (e: React.MouseEvent) => void;
  handleBack: (e: React.MouseEvent) => void;
}

export function ScanSteps({
  currentStep,
  maxStep,
  disableNextStep,
  disablePrevStep,
  handleNext,
  handleBack,
}: ScanStepsProps) {
  const theme = useTheme();
  return (
    <Paper
      elevation={2}
      sx={({ breakpoints }) => ({
        position: "fixed",
        bottom: 0,
        left: "50%",
        translate: "-50%",
        width: "100%",
        maxWidth: breakpoints.values.sm,
      })}
    >
      <Box
        sx={{
          height: 50,
          display: "flex",
          justifyContent: currentStep === 0 ? "flex-end" : "space-between",
          alignContent: "center",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        {currentStep !== 0 && (
          <Button
            sx={{ height: "100%" }}
            onClick={handleBack}
            disabled={currentStep === 0 || disablePrevStep}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        )}

        <Button
          sx={{ height: "100%" }}
          onClick={handleNext}
          disabled={disableNextStep}
        >
          {currentStep !== maxStep - 1 ? (
            <>
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </>
          ) : (
            <>
              <RestartAlt />
              Restart
            </>
          )}
        </Button>
      </Box>
      {/* <MobileStepper
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
          <Button
            size="small"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      /> */}
    </Paper>
  );
}
