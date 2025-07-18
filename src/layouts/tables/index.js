import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import VuiPagination from "components/VuiPagination";
import SortButtons from "./components/SortButtons";
import FilterDropdown from "./components/FilterDropdown";
import SearchInput from "examples/SearchInput";
import AnalysisModal from "./components/AnalysisModal";

function Tables() {
  const [repoColumns, setRepoColumns] = useState([]);
  const [repoRows, setRepoRows] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [sortKey, setSortKey] = useState("updates");
  const [sortOrder, setSortOrder] = useState("desc");

  const [selectedTool, setSelectedTool] = useState("All");
  const [selectedRerun, setSelectedRerun] = useState("All");

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedRepoForModal, setSelectedRepoForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/dashboard_data.json`)
      .then((res) => res.json())
      .then((data) => {
        setRepoColumns([
          { name: "name", align: "left", width: "15%" },
          { name: "vulnerabilities", align: "center", width: "10%" },
          { name: "updates", align: "center", width: "15%" },
          { name: "sastTool", align: "center", width: "15%" },
          { name: "rerun", align: "center", width: "10%" },
          { name: "url", align: "left", width: "40%" },
        ]);

        const rows = data.repos.map((repo) => ({
          ...repo,
          name: (
            <span
              style={{
                color: "#56C1FF",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
              onClick={() => {
                setSelectedRepoForModal(repo);
                setIsModalOpen(true);
              }}
            >
              {repo.name}
            </span>
          ),
          vulnerabilities: repo.vulnerabilities,
          updates: repo.updates
            ? new Date(repo.updates).toLocaleString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }).replace(",", "")
            : "",
          sastTool: repo.sastTool || "N/A",
          rerun: repo.rerun ? "Yes" : "No",
          url: (
            <a
              href={repo.repo_url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#5e72e4", wordBreak: "break-all" }}
            >
              {repo.repo_url}
            </a>
          ),
        }));

        setRepoRows(rows);
        setOriginalData(rows);
      })
      .catch((err) => console.error("dashboard_data.json 로드 실패:", err));
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = originalData.filter(
      (row) =>
        typeof row.name === "object" &&
        (row.repo_url?.toLowerCase().includes(query) ||
          row.owner?.toLowerCase().includes(query))
    );
    setRepoRows(filtered);
    setCurrentPage(1);
  };

  const filteredRows = repoRows.filter((row) => {
    const matchTool = selectedTool === "All" || row.sastTool === selectedTool;
    const matchRerun = selectedRerun === "All" || row.rerun === selectedRerun;
    return matchTool && matchRerun;
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortKey) return 0;

    if (sortKey === "updates") {
      const dateA = new Date(a.updates || "1970-01-01");
      const dateB = new Date(b.updates || "1970-01-01");
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }

    const valA = Number(a[sortKey]);
    const valB = Number(b[sortKey]);
    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #0f1123, #1a1d40, #3d55cc) !important",
              borderRadius: "20px !important",
              padding: "24px !important",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3) !important",
              overflow: "hidden !important",
            }}
          >
            <VuiBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={3}
              py={2}
              sx={{ backgroundColor: "transparent !important" }}
            >
              <VuiTypography variant="lg" color="white">
                Repositories Table
              </VuiTypography>
            </VuiBox>

            <VuiBox px={3} py={1}>
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
                placeholder="Search by repo name, owner, or URL"
              />
            </VuiBox>

            <VuiBox
              display="flex"
              gap={2}
              flexWrap="wrap"
              px={3}
              py={1}
              sx={{ backgroundColor: "transparent !important" }}
            >
              <SortButtons handleSort={handleSort} sortKey={sortKey} sortOrder={sortOrder} />
              <FilterDropdown
                label="SAST Tool"
                value={selectedTool}
                options={["All", "Semgrep", "CodeQL", "Snyk Code", "ESLint"]}
                onChange={(e) => setSelectedTool(e.target.value)}
                bgColor="rgb(87,68,236)"
              />
              <FilterDropdown
                label="Rerun"
                value={selectedRerun}
                options={["All", "Yes", "No"]}
                onChange={(e) => setSelectedRerun(e.target.value)}
                bgColor="rgb(108,70,206)"
              />
            </VuiBox>

            <VuiBox
              sx={{
                backgroundColor: "transparent !important",
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child) td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              }}
            >
              <Table columns={repoColumns} rows={paginatedRows} />
            </VuiBox>

            <VuiPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Card>
        </VuiBox>
      </VuiBox>

      <Footer />

      <AnalysisModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        repo={selectedRepoForModal}
      />
    </DashboardLayout>
  );
}

export default Tables;
