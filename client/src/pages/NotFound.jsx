import React from "react";
import {Box, Typography, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 4rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box textAlign="center">
        <Typography
          component="div"
          sx={{fontWeight: 700, fontSize: {xs: 56, sm: 96}}}
        >
          404
        </Typography>

        <Typography variant="h6" sx={{mt: 2}}>
          Page not found
        </Typography>

        <Typography color="text.secondary" sx={{mb: 3}}>
          The page you are looking for doesn't exist or has been moved.
        </Typography>

        <Button variant="contained" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
