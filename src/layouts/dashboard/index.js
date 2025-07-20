import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import StatisticsCards from "layouts/dashboard/components/StatisticsCards";
import VulnerabilityOverview from "layouts/dashboard/components/VulnerabilityOverview";
import MergeSuccessCountCard from "layouts/dashboard/components/MergeSuccessCountCard";
import ApprovedPRsModal from "layouts/dashboard/components/ApprovedPRsModal";

import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";

import linearGradient from "assets/theme/functions/linearGradient";
import colors from "assets/theme/base/colors";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;

  const [weeklyChartData, setWeeklyChartData] = useState([]);
  const [dailyChartData, setDailyChartData] = useState([]);
  const [prCount, setPrCount] = useState(null);
  const [repoCount, setRepoCount] = useState(null);
  const [vulnStats, setVulnStats] = useState(null);
  const [approvedPRs, setApprovedPRs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // 🔹 PR 모달 상태

  const weeklyChartOptions = {
    chart: { type: "area", toolbar: { show: false } },
    xaxis: {
      type: "category",
      labels: { style: { colors: "#fff", fontSize: "12px" } },
    },
    yaxis: {
      tickAmount: 5,
      forceNiceScale: true,
      labels: {
        style: { colors: "#fff", fontSize: "12px" },
        formatter: (val) => (Number.isInteger(val) ? val : ""),
      },
    },
    tooltip: { theme: "dark" },
    stroke: { curve: "smooth" },
  };

  const dailyChartOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: {
      type: "category",
      labels: { style: { colors: "#fff", fontSize: "12px" } },
    },
    yaxis: {
      tickAmount: 5,
      forceNiceScale: true,
      labels: {
        style: { colors: "#fff", fontSize: "12px" },
        formatter: (val) => (Number.isInteger(val) ? val : ""),
      },
    },
    tooltip: { theme: "dark" },
    plotOptions: {
      bar: { borderRadius: 4, columnWidth: "50%" },
    },
  };

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/dashboard_data.json`)
      .then((res) => res.json())
      .then((data) => {
        setPrCount(data.prCount);
        setRepoCount(data.repoCount);
        setVulnStats(data.vulnerabilityStats);
        setApprovedPRs(data.approved_prs || []);

        setWeeklyChartData([
          {
            name: "Weekly PRs",
            data: data.charts.weeklyPRs,
          },
        ]);

        setDailyChartData([
          {
            name: "Daily PRs",
            data: data.charts.dailyPRs.map((d) => ({ x: d.x, y: d.y })),
          },
        ]);
      })
      .catch((err) =>
        console.error("Failed to load dashboard_data.json:", err)
      );
  }, []);

  if (!prCount || repoCount === null || vulnStats === null) return null;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <StatisticsCards prCount={prCount} repoCount={repoCount} />

          {/* 🟪 Merge & Vulnerability 비율 조정 */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={5} lg={4}>
              <Card sx={{ height: "100%", minHeight: "200px" }}>
                <MergeSuccessCountCard
                  count={approvedPRs.length}
                  onOpen={() => setModalOpen(true)} // 🔹 버튼 클릭 시 모달 열기
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
              <Card sx={{ height: "100%", minHeight: "260px" }}>
                <VulnerabilityOverview stats={vulnStats} />
              </Card>
            </Grid>
          </Grid>
        </VuiBox>

        {/* 🟦 Weekly & Daily PR Overview */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Card sx={{ padding: "24px", height: "100%", minHeight: "300px" }}>
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                  Weekly PR Overview
                </VuiTypography>
                <VuiBox sx={{ height: "220px" }}>
                  <LineChart
                    lineChartData={weeklyChartData}
                    lineChartOptions={weeklyChartOptions}
                  />
                </VuiBox>
              </Card>
            </Grid>

            <Grid item xs={12} md={7}>
              <Card sx={{ padding: "24px", height: "100%", minHeight: "300px" }}>
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                  Daily PR Overview
                </VuiTypography>
                <VuiBox
                  sx={{
                    height: "220px",
                    background: linearGradient(
                      cardContent.main,
                      cardContent.state,
                      cardContent.deg
                    ),
                    borderRadius: "20px",
                    overflow: "visible",
                  }}
                >
                  <BarChart
                    barChartData={dailyChartData}
                    barChartOptions={dailyChartOptions}
                  />
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>

      {/* 🔵 승인된 PR 모달 */}
      <ApprovedPRsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        approvedPRs={approvedPRs}
      />

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;