import { useTheme } from "@mui/material/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, Paper, Box, Typography } from "@mui/material";
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
    <Paper
      elevation={3}
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
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Button
          // size="small"
          sx={{ height: "100%" }}
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

        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography>Step Name</Typography>
        </Box>

        <Button
          // size="small"
          sx={{ height: "100%" }}
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
