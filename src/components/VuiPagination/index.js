import React from "react";
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";

const MAX_PAGE_GROUP = 10;

function VuiPagination({ currentPage, totalPages, onPageChange }) {
  const currentGroup = Math.floor((currentPage - 1) / MAX_PAGE_GROUP);
  const startPage = currentGroup * MAX_PAGE_GROUP + 1;
  const endPage = Math.min(startPage + MAX_PAGE_GROUP - 1, totalPages);

  const handlePrevGroup = () => {
    if (startPage > 1) onPageChange(startPage - 1);
  };

  const handleNextGroup = () => {
    if (endPage < totalPages) onPageChange(endPage + 1);
  };

  return (
    <VuiBox display="flex" justifyContent="center" mt={2} pb={2} gap={1} flexWrap="wrap">
      {/* Prev */}
      {startPage > 1 && (
        <VuiButton variant="gradient" color="dark" size="small" onClick={handlePrevGroup}>
          ❮
        </VuiButton>
      )}

      {/* Page numbers */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;
        return (
          <VuiButton
            key={page}
            variant={page === currentPage ? "contained" : "gradient"}
            color={page === currentPage ? "info" : "dark"}
            size="small"
            onClick={() => onPageChange(page)}
            sx={{ minWidth: "36px", height: "36px", padding: "0" }}
          >
            {page}
          </VuiButton>
        );
      })}

      {/* Next */}
      {endPage < totalPages && (
        <VuiButton variant="gradient" color="dark" size="small" onClick={handleNextGroup}>
          ❯
        </VuiButton>
      )}
    </VuiBox>
  );
}

VuiPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default VuiPagination;
