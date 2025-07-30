import React from "react";
import { Card, Button } from "@mui/material";
import { IoHappyOutline } from "react-icons/io5";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import colors from "assets/theme/base/colors";

const MergeSuccessCountCard = ({ count = 0, onOpen }) => {
  const { info } = colors;

  return (
    <Card
      sx={{
        height: "100%",
        padding: "20px 16px 28px",
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
          sx={{ color: "#ffffff", mt: 0.5, mb: 1.2 }}
        >
          Merge Approval
        </VuiTypography>

        <VuiBox
          sx={{
            backgroundColor: info.main,
            width: 65,
            height: 65,
            borderRadius: "50%",
            mx: "auto",
            my: 1.4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(108, 99, 255, 0.6)",
          }}
        >
          <IoHappyOutline size={30} color="#fff" />
        </VuiBox>

        <VuiTypography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#ffffff", mt: 1.2, mb: 0.5 }}
        >
          {count} PRs under review
        </VuiTypography>
      </VuiBox>

      <Button
        variant="contained"
        onClick={onOpen}
        sx={{
          mt: 2.2,
          mb: 1.5,
          fontSize: "1rem",
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
