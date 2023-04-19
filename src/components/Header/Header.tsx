import { Box, IconButton, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
  icon?: JSX.Element;
}

export function Header({ title, icon }: HeaderProps) {
  return (
    <Box sx={{ textAlign: "center", my: 1, position: "relative" }}>
      <Typography variant="h6">{title}</Typography>
      {icon && (
        <Box sx={{ position: "absolute", right: 16, top: -2 }}>{icon}</Box>
      )}
    </Box>
  );
}
