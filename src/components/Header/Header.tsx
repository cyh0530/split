import { Box, Container, Paper, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
  icon?: JSX.Element;
}

export function Header({ title, icon }: HeaderProps) {
  return (
    <Container maxWidth="sm" disableGutters sx={{ position: "fixed", zIndex: 10 }}>
      <Paper>
        <Box sx={{ textAlign: "center", py: 1 }}>
          <Typography variant="h6">{title}</Typography>
          {icon && (
            <Box sx={{ position: "absolute", right: 16, top: 4 }}>{icon}</Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
