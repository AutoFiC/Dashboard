import React from "react";
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";

function SortButtons({ handleSort, sortKey, sortOrder }) {
  const getArrow = (key) => {
    if (sortKey !== key) return "";
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  const buttonStyles = (bgColor, hoverColor) => ({
    backgroundColor: `${bgColor} !important`,
    color: "#fff !important",
    fontSize: "0.9rem",
    fontWeight: "normal",
    minWidth: "130px",
    height: "30px",
    borderRadius: "10px",
    padding: "0 12px",
    textTransform: "none",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: `${hoverColor} !important`,
    },
    "&:active": {
      backgroundColor: `${bgColor} !important`,
    },
    "&:focus": {
      backgroundColor: `${bgColor} !important`,
      outline: "none !important",
      boxShadow: "none !important",
    },
    "&:focus-visible": {
      backgroundColor: `${bgColor} !important`,
      outline: "none !important",
      boxShadow: "none !important",
    },
  });

  return (
    <VuiBox display="flex" gap={2} flexWrap="wrap" px={3} py={1}>
      <VuiButton
        size="small"
        onClick={() => handleSort("vulnerabilities")}
        sx={buttonStyles("#2652fb", "#3c64fd")}
      >
        Sort by Vulnerabilities{getArrow("vulnerabilities")}
      </VuiButton>
      <VuiButton
        size="small"
        onClick={() => handleSort("updates")}
        sx={buttonStyles("#4d2ef6", "#5c3ffc")}
      >
        Sort by Updates{getArrow("updates")}
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
