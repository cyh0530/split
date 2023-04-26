import { Modal, Box, ModalProps } from "@mui/material";
import { ReactNode } from "react";

interface CenterModalProps {
  open: boolean;
  modalProps?: Partial<ModalProps>;
  children: ReactNode;
}

export function CenterModal({ open, modalProps, children }: CenterModalProps) {
  return (
    <Modal open={open} {...modalProps}>
      <Box
        sx={({ breakpoints }) => ({
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          height: "100%",
          margin: "auto",
          padding: "10px",
          [breakpoints.down("sm")]: {
            width: "100%",
          },
          [breakpoints.up("sm")]: {
            width: breakpoints.values.sm,
          },
        })}
      >
        <Box
          sx={{
            flex: 1,
            padding: 2,
            background: "white",
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
}
