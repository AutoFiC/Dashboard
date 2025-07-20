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
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Chart from "react-apexcharts";

function AnalysisModal({ open, onClose, repo }) {
  if (!repo) return null;

  const textColor = "#e3f2fd";
  const cardBg = "linear-gradient(135deg, #20263a, #2e3a6a)";
  const sectionBg = "linear-gradient(135deg, #283046, #3f497d)";
  const border = "1px solid rgba(255, 255, 255, 0.08)";
  const fontFamily = "'Poppins', 'Noto Sans KR', 'Fira Code', sans-serif";
  const highlightColor = "#bce0eeff";
  const secondaryColor = "#4baaf8ff";

  const renderByClassDonutChart = () => {
    if (!repo.byClass || repo.byClass.length === 0) return null;

    const labels = repo.byClass.map((item) => item.type);
    const series = repo.byClass.map((item) => item.count);

    const options = {
      chart: {
        type: "donut",
        background: "transparent !important",
        fontFamily,
      },
      labels,
      legend: {
        labels: {
          colors: ["#e3f2fd"],
          useSeriesColors: false,
          fontFamily,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000"],
          fontSize: "14px",
          fontWeight: 500,
          fontFamily,
        },
      },
      tooltip: {
        theme: "dark",
        style: {
          fontSize: "13px",
          fontFamily,
        },
      },
      theme: {
        mode: "dark",
      },
      colors: ["#4baaf8", "#6ad4dd", "#a8d7ea", "#8c66ff", "#f9a826"],
    };

    return (
      <VuiBox
        mt={4}
        sx={{
          background: sectionBg,
          padding: 3,
          borderRadius: "16px",
          border,
          boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
        }}
      >
        <VuiTypography
          variant="button"
          fontWeight="bold"
          mb={2}
          sx={{ fontSize: "1rem", color: secondaryColor }}
        >
          📉 Vulnerability Chart
        </VuiTypography>
        <Chart options={options} series={series} type="donut" height={300} />
      </VuiBox>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box
        sx={{
          background: cardBg,
          color: textColor,
          fontFamily,
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(30, 36, 74, 0.9)",
            color: textColor,
            padding: "18px 24px",
            fontFamily,
            borderBottom: border,
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontWeight: 900,
                background: "linear-gradient(90deg, #4baaf8ff, #a8d7ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {repo.name}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{ background: cardBg, padding: "26px", fontFamily, color: textColor }}
        >
          <VuiBox
            mb={4}
            sx={{
              background: sectionBg,
              padding: 3,
              borderRadius: "16px",
              border,
              boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
            }}
          >
            <VuiTypography
              variant="button"
              fontWeight="bold"
              mb={2}
              sx={{ fontSize: "1rem", color: secondaryColor }}
            >
              🧷 Repository Info
            </VuiTypography>

            {[["Owner", repo.owner],
              ["SAST Tool", repo.sastTool],
              ["Vulnerabilities", repo.vulnerabilities],
              ["Rerun", repo.rerun ? "Yes" : "No"],
              [
                "Last Updated",
                new Date(repo.updates).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }),
              ],
            ].map(([label, value], idx) => (
              <Typography
                key={idx}
                sx={{ color: highlightColor, fontSize: "0.95rem", mb: 0.5 }}
              >
                <strong>{label}:</strong>{" "}
                <span style={{ color: textColor }}>{value}</span>
              </Typography>
            ))}
          </VuiBox>

          {renderByClassDonutChart()}

          {repo.analysis && (
            <VuiBox
              mt={4}
              sx={{
                background: sectionBg,
                padding: 3,
                borderRadius: "16px",
                border,
                boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
              }}
            >
              <VuiTypography
                variant="button"
                fontWeight="bold"
                mb={2}
                sx={{ fontSize: "1rem", color: secondaryColor }}
              >
                🧾 AI-generated Analysis
              </VuiTypography>
              <Box
                sx={{
                  backgroundColor: "#121c3a",
                  padding: 2,
                  borderRadius: 2,
                  fontFamily: "'Poppins', 'Noto Sans KR', 'Roboto', sans-serif",
                  fontSize: "0.95rem",
                  whiteSpace: "pre-wrap",
                  color: "#e3f2fd",
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
