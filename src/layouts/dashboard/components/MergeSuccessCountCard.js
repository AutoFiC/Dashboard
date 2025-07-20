import React from "react";
import { Card, Button } from "@mui/material";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import colors from "assets/theme/base/colors";

const MergeSuccessCountCard = ({ approvedCount = 0, onOpen }) => {
  const { info } = colors;

  return (
    <Card
      sx={{
        height: "100%",
        padding: "20px 16px 28px", // 하단 여백(padding bottom) 증가
        borderRadius: "20px",
        background: "linear-gradient(135deg, #0f1123, #1a1d40, #3d55cc)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#fff",
        boxShadow: "0 0 15px rgba(108, 99, 255, 0.3)",
      }}
    >
      <VuiBox textAlign="center">
        <VuiTypography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#ffffff !important", mt: 0.5, mb: 1.2 }}
        >
          Merge Approval
        </VuiTypography>

        <VuiBox
          sx={{
            background: info.main,
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            mx: "auto",
            my: 1.4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(108, 99, 255, 0.6)",
          }}
        >
          <IoCheckmarkCircleOutline size="30px" color="#fff" />
        </VuiBox>

        <VuiTypography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#ffffff !important", mt: 1.2, mb: 0.5 }}
        >
          {approvedCount} PRs approved
        </VuiTypography>
      </VuiBox>

      <Button
        variant="contained"
        onClick={onOpen}
        sx={{
          mt: 2.2,
          mb: 1.5, // 버튼 아래 여백 추가
          fontSize: "0.8rem",
          fontWeight: 500,
          textTransform: "none",
          borderRadius: "12px",
          backgroundColor: "#6c63ff",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#5e54e4",
          },
        }}
      >
        View approved PRs
      </Button>
    </Card>
  );
};

export default MergeSuccessCountCard;
