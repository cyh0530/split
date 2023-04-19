import { Box } from "@mui/material";
import { Header } from "../Header";
import React from "react";

interface ScanContainerProps {
  title: string;
  titleIcon?: JSX.Element;
  titleIconOnClick?: () => void;
  children: React.ReactNode;
}

export function ScanContainer({
  title,
  titleIcon,
  titleIconOnClick,
  children
}: ScanContainerProps) {
  return (
    <Box>
      <Header title={title} icon={titleIcon} onClick={titleIconOnClick} />
      <Box
        sx={
          {
            height: "calc(100vh - 90px)",
            overflow: "auto"
          }
        }
      >
        {children}
      </Box>
    </Box>
  );
}
