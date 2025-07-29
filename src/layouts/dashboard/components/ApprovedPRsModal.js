import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Table from "examples/Tables/Table";
import VuiBox from "components/VuiBox";
import Card from "@mui/material/Card";

function ApprovedPRsModal({ open, onClose, approvedPRs = [], approved_pr_count = 0 }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const columns = [
    { name: "repo_name", align: "left", label: "Repository" },
    { name: "owner", align: "left", label: "Owner" },
    { name: "user_name", align: "left", label: "Contributor" },
    { name: "date", align: "center", label: "Date" },
    { name: "pr_link", align: "left", label: "Repo URL" },
  ];

  const rows = approvedPRs.map((pr) => ({
    repo_name: (
      <span style={{ color: "#56C1FF", fontWeight: 600 }}>
        {pr?.repo_name ?? "Unknown"}
      </span>
    ),
    owner: <span style={{ color: "#ffffffcc" }}>{pr?.owner ?? "Unknown"}</span>,
    user_name: (
      <span style={{ color: "#ffffffcc" }}>{pr?.user_name ?? "Unknown"}</span>
    ),
    date: pr?.date?.split?.("T")?.[0] ?? "Unknown",
    pr_link: pr?.repo_url ? (
      <a
        href={pr.repo_url}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "block",
          color: "#5e72e4",
          fontWeight: 500,
          wordBreak: "break-all",
        }}
      >
        {pr.repo_url}
      </a>
    ) : (
      "N/A"
    ),
  }));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          backgroundColor: "transparent !important",
          boxShadow: "none !important",
          borderRadius: "0px !important",
        },
      }}
    >
      <Card
        sx={{
          background: "linear-gradient(135deg, #0f1123, #1a1d40, #3d55cc)",
          color: "#fff",
          borderRadius: "20px",
          padding: "16px",
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 0,
            color: "#fff !important",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold !important",
              fontSize: "1.2rem !important",
              color: "#b6bed6ff !important",
            }}
          >
            Approved Pull Requests
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#ffffff !important" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <VuiBox mt={2}>
            {/* 오른쪽 상단 카드 */}
            <Box display="flex" justifyContent="flex-end" mb={1}>
              <Box
                sx={{
                  backgroundColor: "#6c63ff !important",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: "#ffffff !important",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                Total Approved: {approved_pr_count}
              </Box>
            </Box>
            {/* 테이블 */}
            <Table columns={columns} rows={rows} />
          </VuiBox>
        </DialogContent>
      </Card>
    </Dialog>
  );
}

export default ApprovedPRsModal;
