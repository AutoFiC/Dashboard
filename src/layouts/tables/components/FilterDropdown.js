import React from "react";
import { FormControl, MenuItem, Select, Box } from "@mui/material";

function FilterDropdown({ label, value, onChange, options, bgColor = "#1e88e5" }) {
  const selectSx = {
    backgroundColor: `${bgColor} !important`,
    color: "#fff !important",
    borderRadius: "10px !important",
    fontSize: "0.9rem !important",
    fontFamily: "'Poppins', 'Noto Sans KR', sans-serif !important",
    height: "30px !important",
    minWidth: "130px",
    padding: "0 12px !important",
    "& .MuiSelect-icon": {
      color: "#fff !important",
    },
  };

  const menuSx = {
    background: "linear-gradient(135deg, #0f1e3c, #1e2a4f) !important",
    color: "#ffffff !important",
    fontWeight: "500 !important",
    fontSize: "0.9rem !important",
    fontFamily: "'Poppins', 'Noto Sans KR', sans-serif !important",
    borderRadius: "12px !important",
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.4) !important",
    padding: "4px 0 !important",
    mt: "8px !important",
    "& .MuiMenuItem-root": {
      transition: "all 0.2s ease-in-out !important",
      borderRadius: "8px !important",
      margin: "4px 8px !important",
      padding: "10px 16px !important",
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "#2f477a !important",
    },
  };

  const labelSx = {
    color: "#bbb !important",
    fontWeight: "bold !important",
    fontSize: "0.9rem !important",
    whiteSpace: "nowrap !important",
    marginRight: "8px !important",
    fontFamily: "'Poppins', 'Noto Sans KR', sans-serif !important",
  };

  return (
    <Box display="flex" alignItems="center" sx={{ marginRight: "16px", minWidth: "180px" }}>
      <Box sx={labelSx}>{label}:</Box>

      <FormControl size="small" sx={{ minWidth: 130 }}>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          sx={selectSx}
          MenuProps={{
            PaperProps: {
              sx: menuSx,
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                fontSize: "0.9rem !important",
                fontFamily: "'Poppins', 'Noto Sans KR', sans-serif !important",
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
