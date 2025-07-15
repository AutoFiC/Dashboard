// SortButtons.js
import React from "react";
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";

function SortButtons({ handleSort, sortKey, sortOrder }) {
  const getArrow = (key) => {
    if (sortKey !== key) return "";
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <VuiBox display="flex" gap={2} flexWrap="wrap" px={3} py={1}>
      <VuiButton
        size="small"
        onClick={() => handleSort("vulnerabilities")}
        sx={{
          backgroundColor: "#2652fb",
          color: "#fff",
          fontSize: "0.9rem",
          fontWeight: "normal !important",
          minWidth: "130px",                // ✅ 가로 길이
          height: "30px !important",        // ✅ 세로 길이
          borderRadius: "10px",
          padding: "0 12px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#3c64fd",
          },
        }}
      >
        Sort by Vulnerabilities{getArrow("vulnerabilities")}
      </VuiButton>

      <VuiButton
        size="small"
        onClick={() => handleSort("changes")}
        sx={{
          backgroundColor: "#4d2ef6",
          color: "#fff",
          fontSize: "0.9rem",
          fontWeight: "normal !important",
          minWidth: "130px",                // ✅ 가로 길이
          height: "30px !important",        // ✅ 세로 길이
          borderRadius: "10px",
          padding: "0 12px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#5c3ffc",
          },
        }}
      >
        Sort by Changes{getArrow("changes")}
      </VuiButton>
    </VuiBox>
  );
}

SortButtons.propTypes = {
  handleSort: PropTypes.func.isRequired,
  sortKey: PropTypes.string,
  sortOrder: PropTypes.string,
};

export default SortButtons;
