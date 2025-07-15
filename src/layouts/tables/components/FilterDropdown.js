// FilterDropdown.js
import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Box,
} from "@mui/material";

function FilterDropdown({ label, value, onChange, options, bgColor = "#1e88e5" }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        marginRight: "16px",
        minWidth: "180px",
      }}
    >
      <Box
        sx={{
          color: "#bbb", // 흐린 텍스트
          fontWeight: "bold",
          fontSize: "0.9rem",
          whiteSpace: "nowrap",
          marginRight: "8px",
        }}
      >
        {label}:
      </Box>

      <FormControl size="small" sx={{ minWidth: 130 }}>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          inputProps={{
            sx: {
              backgroundColor: `${bgColor} !important`,
              color: "#fff !important",
              fontSize: "0.9rem",
              borderRadius: "10px",
              height: "30px !important",
              padding: "0 12px",
              "& .MuiSelect-icon": {
                color: "#fff !important",
              },
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#0d1c3f",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.9rem",
              },
            },
          }}
          sx={{
            backgroundColor: `${bgColor} !important`,
            color: "#fff !important",
            borderRadius: "10px",
            fontSize: "0.9rem",
            height: "30px !important",
            minWidth: "130px",
            "& .MuiSelect-icon": {
              color: "#fff !important",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                py: 1.2,
                px: 2,
                minHeight: "30px",
                fontSize: "0.9rem",
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterDropdown;
