import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

export function Home() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          padding: 5,
          backgroundImage: "url(/images/white-banner.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh"
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2
            }}
          >
            <Typography variant="h4">
              Split the bill by a single snap
            </Typography>
            <Typography>
              Scan the check and split with friends with ease
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Box sx={{ display: "flex" }}>
                <LocalDiningIcon />
                <LocalGroceryStoreIcon />
                <LocalCafeIcon />
              </Box>
            </Box>
            <Link to="/scan">
              <Button variant="contained" color="primary">
                <Box sx={{ display: "flex", gap: 1 }}>
                  Get Started
                  <KeyboardArrowRightIcon />
                </Box>
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
