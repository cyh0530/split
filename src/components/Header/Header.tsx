import { Box, Paper, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
  icon?: JSX.Element;
}

export function Header({ title, icon }: HeaderProps) {
  return (
    <Paper>
      <Box sx={{ textAlign: "center", py: 1, position: "relative" }}>
        <Typography variant="h6">{title}</Typography>
        {icon && (
          <Box sx={{ position: "absolute", right: 16, top: 4 }}>{icon}</Box>
        )}
      </Box>
    </Paper>
  );
}
