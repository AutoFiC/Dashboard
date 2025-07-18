import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Chart from "react-apexcharts";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function AnalysisModal({ open, onClose, repo }) {
  if (!repo) return null;

  const textColor = "#f1f1f1";
  const cardBg = "#1c1f3b";
  const sectionBg = "#242845";
  const border = "1px solid rgba(255,255,255,0.05)";

  const donutSeries = repo.byClass?.map((item) => item.count) || [];

  const labelCount = donutSeries.length;
  const whiteArray = new Array(labelCount).fill("#ffffff");

  const donutOptions = {
    chart: { type: "donut" },
    labels: repo.byClass?.map((item) => item.type),
    legend: {
      position: "bottom",
      labels: {
        colors: whiteArray,
        useSeriesColors: false,
      },
      fontSize: "14px",
      fontWeight: 500,
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
    },
    dataLabels: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        colors: ["#ffffff"],
      },
    },
    tooltip: { theme: "dark" },
    stroke: { width: 2 },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ backgroundColor: cardBg, color: `${textColor} !important` }}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(135deg, #0f1123, #1a1d40)",
            color: "#ffffff !important",
            fontSize: "1.25rem !important",
            fontWeight: "bold !important",
            padding: "16px 24px !important",
            fontFamily: "'Noto Sans KR', 'Roboto', sans-serif",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <span role="img" aria-label="analyze">🧠</span> {repo.name} - Repository Analysis
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: "#ffffff",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            backgroundColor: cardBg,
            padding: "24px !important",
            fontFamily: "'Noto Sans KR', 'Roboto', sans-serif",
            color: `${textColor} !important`,
          }}
        >
          {/* Repository Info */}
          <VuiBox
            mb={4}
            sx={{
              backgroundColor: sectionBg,
              padding: 3,
              borderRadius: "12px",
              border,
              fontFamily: "'Noto Sans KR', 'Roboto', sans-serif",
            }}
          >
            <VuiTypography
              variant="button"
              color="white"
              fontWeight="bold"
              mb={2}
              sx={{ fontSize: "0.95rem !important" }}
            >
              🧷 Repository Info
            </VuiTypography>

            <Typography sx={{ color: textColor, fontSize: "0.95rem !important", fontFamily: "'Noto Sans KR', sans-serif" }}>
              <strong>Owner:</strong> {repo.owner}
            </Typography>
            <Typography sx={{ color: textColor, fontSize: "0.95rem !important", fontFamily: "'Noto Sans KR', sans-serif" }}>
              <strong>SAST Tool:</strong> {repo.sastTool}
            </Typography>
            <Typography sx={{ color: textColor, fontSize: "0.95rem !important", fontFamily: "'Noto Sans KR', sans-serif" }}>
              <strong>Vulnerabilities:</strong> {repo.vulnerabilities}
            </Typography>
            <Typography sx={{ color: textColor, fontSize: "0.95rem !important", fontFamily: "'Noto Sans KR', sans-serif" }}>
              <strong>Rerun:</strong> {repo.rerun ? "Yes" : "No"}
            </Typography>
            <Typography sx={{ color: textColor, fontSize: "0.95rem !important", fontFamily: "'Noto Sans KR', sans-serif" }}>
              <strong>Last Updated:</strong>{" "}
              {new Date(repo.updates).toLocaleString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </Typography>
          </VuiBox>

          {/* Vulnerability Classes */}
          {donutSeries.length > 0 && (
            <VuiBox
              mb={4}
              sx={{
                backgroundColor: sectionBg,
                padding: 3,
                borderRadius: "12px",
                border,
              }}
            >
              <VuiTypography
                variant="button"
                color="white"
                fontWeight="bold"
                mb={2}
                sx={{ fontSize: "0.95rem !important" }}
              >
                📊 Vulnerability Classes
              </VuiTypography>
              <Chart
                options={donutOptions}
                series={donutSeries}
                type="donut"
                height={260}
              />
            </VuiBox>
          )}

          {/* AI Analysis */}
          {repo.analysis && (
            <VuiBox
              sx={{
                backgroundColor: sectionBg,
                padding: 3,
                borderRadius: "12px",
                border,
              }}
            >
              <VuiTypography
                variant="button"
                color="white"
                fontWeight="bold"
                mb={2}
                sx={{ fontSize: "0.95rem !important" }}
              >
                🧾 AI-generated Analysis
              </VuiTypography>
              <Box
                sx={{
                  backgroundColor: "#0b1437",
                  padding: 2,
                  borderRadius: 2,
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "0.95rem !important",
                  whiteSpace: "pre-wrap",
                  color: `${textColor} !important`,
                }}
              >
                {repo.analysis}
              </Box>
            </VuiBox>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default AnalysisModal;
