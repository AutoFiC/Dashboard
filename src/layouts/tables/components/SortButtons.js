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
    fontSize: "0.9rem !important",
    fontWeight: "normal !important",
    minWidth: "130px !important",
    height: "30px !important",
    borderRadius: "10px !important",
    padding: "0 12px !important",
    textTransform: "none !important",
    "&:hover": {
      backgroundColor: `${hoverColor} !important`,
    },
    "&:active": {
      backgroundColor: `${bgColor} !important`,
      boxShadow: "none !important",
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
        onClick={() => handleSort("changes")}
        sx={buttonStyles("#4d2ef6", "#5c3ffc")}
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
