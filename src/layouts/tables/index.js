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

const SAST_TOOLS = ["All", "Semgrep", "CodeQL", "Snyk Code"];
const RERUN_OPTIONS = ["All", "Yes", "No"];
const ROWS_PER_PAGE = 10;

function Tables() {
  const [repoColumns, setRepoColumns] = useState([]);
  const [repoRows, setRepoRows] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
          { name: "repo_name", align: "left", width: "15%" },
          { name: "owner", align: "left", width: "10%" },
          { name: "vulnerabilities", align: "center", width: "10%" },
          { name: "updates", align: "center", width: "15%" },
          { name: "sastTool", align: "center", width: "15%" },
          { name: "rerun", align: "center", width: "10%" },
          { name: "url", align: "left", width: "40%" },
        ]);

        const rows = data.repos.map((repo) => ({
          ...repo,
          vulnerabilities_raw: repo.vulnerabilities,
          sastTool_raw: repo.sastTool || "N/A",
          rerun_raw: repo.rerun ? "Yes" : "No",
          repo_name: (
            <span
              style={{
                color: "#56C1FF",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
              onClick={() => {
                setSelectedRepoForModal(repo);
                setIsModalOpen(true);
              }}
            >
              {repo.name}
            </span>
          ),
          owner: (
            <span style={{ color: "#ffffffcc", fontWeight: 500 }}>{repo.owner}</span>
          ),
          vulnerabilities: (
            <span style={{ fontWeight: 600 }}>
              {repo.vulnerabilities <= 3 && "🟢 "}
              {repo.vulnerabilities >= 4 && repo.vulnerabilities <= 7 && "🟡 "}
              {repo.vulnerabilities >= 8 && "🔴 "}
              {repo.vulnerabilities}
            </span>
          ),
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
              style={{ color: "#75aad3ff", wordBreak: "break-all" }}
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
    setSortOrder((prev) => (sortKey === key && prev === "desc" ? "asc" : "desc"));
    setSortKey(key);
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
    const matchTool =
      selectedTool === "All" || row.sastTool_raw?.toLowerCase() === selectedTool.toLowerCase();
    const matchRerun =
      selectedRerun === "All" || row.rerun_raw?.toLowerCase() === selectedRerun.toLowerCase();
    return matchTool && matchRerun;
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortKey === "updates") {
      return sortOrder === "asc"
        ? new Date(a.updates) - new Date(b.updates)
        : new Date(b.updates) - new Date(a.updates);
    }

    const valA = Number(a.vulnerabilities_raw);
    const valB = Number(b.vulnerabilities_raw);
    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );
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
            {/* 헤더 */}
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" px={3} py={2}>
              <VuiTypography variant="lg" color="white">
                Repositories Table
              </VuiTypography>
            </VuiBox>

            {/* 검색 */}
            <VuiBox px={3} py={1}>
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
                placeholder="Search by repo name, owner, or URL"
              />
            </VuiBox>

            {/* 정렬 & 필터 */}
            <VuiBox display="flex" gap={2} flexWrap="wrap" px={3} py={1}>
              <SortButtons handleSort={handleSort} sortKey={sortKey} sortOrder={sortOrder} />
              <FilterDropdown
                label="SAST Tool"
                value={selectedTool}
                options={["All", "Semgrep", "CodeQL", "Snyk Code"]}
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

            {/* 테이블 */}
            <VuiBox
              sx={{
                "& th, & .MuiTableRow-root:not(:last-child) td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              }}
            >
              <Table columns={repoColumns} rows={paginatedRows} />
            </VuiBox>

            {/* 페이지네이션 */}
            <VuiPagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredRows.length / ROWS_PER_PAGE)}
              onPageChange={setCurrentPage}
            />
          </Card>
        </VuiBox>
      </VuiBox>

      <Footer />

      {/* 모달 */}
      <AnalysisModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        repo={selectedRepoForModal}
      />
    </DashboardLayout>
  );
}

export default Tables;
