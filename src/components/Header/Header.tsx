import { Box, IconButton, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
  icon?: JSX.Element;
  onClick?: () => void;
}

export function Header({ title, icon, onClick }: HeaderProps) {
  return (
    <Box sx={{ textAlign: "center", my: 1 }}>
      <Typography variant="h6">{title}</Typography>
      {icon && (
        <Box sx={{ position: "absolute", right: 0 }}>
          <IconButton onClick={onClick}>{icon}</IconButton>
        </Box>
      )}
    </Box>
  );
}
