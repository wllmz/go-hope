import React from "react";
import { Box, Button, styled } from "@mui/material";

const OptionButton = styled(Button)(({ theme, selected }) => ({
  width: "100%",
  justifyContent: "center",
  padding: "4px",
  marginBottom: "6px",
  backgroundColor: selected ? "#FFA726" : "#FFFFFF",
  color: selected ? "white" : "#666",
  borderRadius: "20px",
  textTransform: "none",
  fontSize: "13px",
  "&:hover": {
    backgroundColor: selected ? "#FFA726" : "#F5F5F5",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "12px",
    marginBottom: "8px",
    borderRadius: "25px",
    fontSize: "14px",
  },
}));

const VerticalSelector = ({ options, value, onChange, title }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
      {title && (
        <Box
          sx={{
            textAlign: "center",
            marginBottom: { xs: "12px", sm: "20px" },
            color: "#666",
            fontSize: { xs: "14px", sm: "16px" },
          }}
        >
          {title}
        </Box>
      )}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {options.map((option) => (
          <OptionButton
            key={option}
            selected={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </OptionButton>
        ))}
      </Box>
    </Box>
  );
};

export default VerticalSelector;
