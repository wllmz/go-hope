import React from "react";
import { Box, Button, styled } from "@mui/material";

const OptionButton = styled(Button)(({ theme, selected }) => ({
  width: "100%",
  justifyContent: "center",
  padding: "12px",
  marginBottom: "8px",
  backgroundColor: selected ? "#FFA726" : "transparent",
  color: selected ? "white" : "#666",
  border: selected ? "none" : "1px solid #E0E0E0",
  borderRadius: "25px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: selected ? "#FFA726" : "#F5F5F5",
  },
}));

const VerticalSelector = ({ options, value, onChange, title }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
      {title && (
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#666",
            fontSize: "16px",
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
