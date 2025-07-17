import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";

function AnalysisModal({ open, onClose, repo }) {
  if (!repo) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{repo.name} - Repository Analysis</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1"><strong>Owner:</strong> {repo.owner}</Typography>
        <Typography variant="subtitle1"><strong>SAST Tool:</strong> {repo.sastTool}</Typography>
        <Typography variant="subtitle1"><strong>Vulnerabilities:</strong> {repo.vulnerabilities}</Typography>
        <Typography variant="subtitle1"><strong>Rerun:</strong> {repo.rerun ? "Yes" : "No"}</Typography>
        <Typography variant="subtitle1"><strong>Last Updated:</strong> {repo.updates}</Typography>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Vulnerability Classes</Typography>
        <ul>
          {repo.byClass?.map((item, idx) => (
            <li key={idx}>
              <Typography>{item.type} ({item.count})</Typography>
            </li>
          ))}
        </ul>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">AI-generated Analysis</Typography>
        <Box
          sx={{
            backgroundColor: "#f3f3f3",
            padding: 2,
            borderRadius: 2,
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          {repo.analysis}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AnalysisModal;
