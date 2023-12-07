import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {};

export default function OrDivider({}: Props) {
  return (
    <Box sx={{ my: 2, display: "flex", alignItems: "center", color: "#ccc" }}>
      <div style={{ flex: 1, borderTop: "1.5px solid #ccc" }} />
      <Typography variant="h6" sx={{ px: 2 }}>
        OR
      </Typography>
      <div style={{ flex: 1, borderTop: "1.5px solid #ccc" }} />
    </Box>
  );
}
