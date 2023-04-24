import { AlertColor } from "@mui/material"

export type SnackbarContent = {
    open: boolean
    severity: AlertColor
    message: string
}