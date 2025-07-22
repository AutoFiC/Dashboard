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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        background: "transparent",
        fontFamily,
      },
      labels,
      legend: {
        labels: {
          colors: [textColor],
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
          color: "#000",
        },
      },
      theme: { mode: "dark" },
      colors: ["#4baaf8", "#6ad4dd", "#a8d7ea", "#8c66ff", "#26ddf9ff"],
    };

    return (
      <>
        <style>
          {`
            .apexcharts-tooltip {
              color: black !important;
            }
          `}
        </style>
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
      </>
    );
  };

  const infoRows = [
    ["Owner", repo.owner],
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
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
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
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            background: cardBg,
            padding: "26px",
            fontFamily,
            color: textColor,
          }}
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

            {infoRows.map(([label, value], idx) => (
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
                🧾 Analysis
              </VuiTypography>
              <Box
                sx={{
                  backgroundColor: "#121c3a",
                  padding: 2,
                  borderRadius: 2,
                  fontFamily: "'Poppins', 'Noto Sans KR', 'Roboto', sans-serif",
                  fontSize: "0.95rem",
                  color: textColor,
                  lineHeight: 1.6,
                  overflowX: "auto",
                }}
              >
                <ReactMarkdown
                  children={repo.analysis}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: (props) => (
                      <h1
                        style={{ fontSize: "1.4rem", fontWeight: "bold", marginTop: "1em" }}
                        {...props}
                      />
                    ),
                    h2: (props) => (
                      <h2
                        style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "1em" }}
                        {...props}
                      />
                    ),
                    h3: (props) => (
                      <h3
                        style={{ fontSize: "1.1rem", fontWeight: "bold", marginTop: "0.8em" }}
                        {...props}
                      />
                    ),
                    p: (props) => <p style={{ margin: "0.5em 0" }} {...props} />,
                    code: (props) => (
                      <code
                        style={{
                          backgroundColor: "#1c2b44",
                          padding: "2px 4px",
                          borderRadius: "4px",
                        }}
                        {...props}
                      />
                    ),
                    table: (props) => (
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          margin: "1em 0",
                        }}
                        {...props}
                      />
                    ),
                    th: (props) => (
                      <th
                        style={{
                          border: "1px solid #4b6584",
                          padding: "6px",
                          backgroundColor: "#2f3b58",
                          color: "#fff",
                        }}
                        {...props}
                      />
                    ),
                    td: (props) => (
                      <td
                        style={{
                          border: "1px solid #4b6584",
                          padding: "6px",
                        }}
                        {...props}
                      />
                    ),
                    a: (props) => (
                      <a style={{ color: secondaryColor, textDecoration: "underline" }} {...props} />
                    ),
                    li: (props) => <li style={{ marginBottom: "0.3em" }} {...props} />,
                  }}
                />
              </Box>
            </VuiBox>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default AnalysisModal;
