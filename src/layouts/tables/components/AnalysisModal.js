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
import ReactMarkdown from "react-markdown";

function AnalysisModal({ open, onClose, repo }) {
  if (!repo) return null;

  const textColor = "#e3f2fd";
  const cardBg = "linear-gradient(135deg, #20263a, #2e3a6a)";
  const sectionBg = "linear-gradient(135deg, #283046, #3f497d)";
  const border = "1px solid rgba(255, 255, 255, 0.08)";
  const fontFamily = "'Poppins', 'Noto Sans KR', 'Roboto', sans-serif";
  const highlightColor = "#bce0eeff";
  const secondaryColor = "#4baaf8ff";

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
          sx={{
            background: cardBg,
            padding: "26px",
            fontFamily,
            color: textColor,
          }}
        >
          {/* Repository Info */}
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
              sx={{
                fontSize: "1rem",
                color: secondaryColor,
              }}
            >
              🧷 Repository Info
            </VuiTypography>

            {[
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
            ].map(([label, value], idx) => (
              <Typography
                key={idx}
                sx={{
                  color: highlightColor,
                  fontSize: "0.95rem",
                  mb: 0.5,
                }}
              >
                <strong>{label}:</strong>{" "}
                <span style={{ color: textColor }}>{value}</span>
              </Typography>
            ))}
          </VuiBox>

          {/* AI Analysis */}
          {repo.analysis && (
            <VuiBox
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
                sx={{
                  fontSize: "1rem",
                  color: secondaryColor,
                }}
              >
                🧾 AI-generated Analysis
              </VuiTypography>
              <Box
                sx={{
                  backgroundColor: "#121c3a",
                  padding: 2,
                  borderRadius: 2,
                  fontSize: "0.95rem",
                  color: "#e3f2fd",
                  lineHeight: 1.6,
                  overflowX: "auto"
                }}
              >
                <ReactMarkdown
                  children={repo.analysis}
                  components={{
                    h1: ({node, ...props}) => <h1 style={{ fontSize: "1.4rem", fontWeight: "bold", marginTop: "1em" }} {...props} />,
                    h2: ({node, ...props}) => <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "1em" }} {...props} />,
                    h3: ({node, ...props}) => <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", marginTop: "0.8em" }} {...props} />,
                    p: ({node, ...props}) => <p style={{ margin: "0.5em 0" }} {...props} />,
                    code: ({node, ...props}) => <code style={{ backgroundColor: "#1c2b44", padding: "2px 4px", borderRadius: "4px" }} {...props} />,
                    table: ({node, ...props}) => <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1em", marginBottom: "1em" }} {...props} />,
                    th: ({node, ...props}) => <th style={{ border: "1px solid #4b6584", padding: "6px", backgroundColor: "#2f3b58", color: "#fff" }} {...props} />,
                    td: ({node, ...props}) => <td style={{ border: "1px solid #4b6584", padding: "6px" }} {...props} />,
                    a: ({node, ...props}) => <a style={{ color: "#4baaf8", textDecoration: "underline" }} {...props} />,
                    li: ({node, ...props}) => <li style={{ marginBottom: "0.3em" }} {...props} />,
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
