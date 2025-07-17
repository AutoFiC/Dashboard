import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import StatisticsCards from "layouts/dashboard/components/StatisticsCards";
import SatisfactionRate from "layouts/dashboard/components/MergeSuccessRate";
import VulnerabilityOverview from "layouts/dashboard/components/VulnerabilityOverview";

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
  const [mergeRate, setMergeRate] = useState(0);
  const [repoCount, setRepoCount] = useState(null);
  const [vulnStats, setVulnStats] = useState(null);

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
        setMergeRate(data.mergeApprovalRate);
        setRepoCount(data.repoCount);
        setVulnStats(data.vulnerabilityStats);

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
      .catch((err) => console.error("Failed to load dashboard_data.json:", err));
  }, []);

  if (!prCount || repoCount === null || vulnStats === null) return null;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <StatisticsCards prCount={prCount} repoCount={repoCount} />

          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <SatisfactionRate rate={mergeRate} />
            </Grid>
            <Grid item xs={12} sm={6} md={9}>
              <VulnerabilityOverview stats={vulnStats} />
            </Grid>
          </Grid>
        </VuiBox>

        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Card sx={{ padding: "24px", height: "100%", minHeight: "300px" }}>
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                  Weekly PR Overview
                </VuiTypography>
                <VuiTypography variant="button" color="success" fontWeight="bold" mb="20px">
                  +0%{" "}
                  <VuiTypography variant="button" color="text" fontWeight="regular">
                    compared to last week
                  </VuiTypography>
                </VuiTypography>
                <VuiBox sx={{ height: "220px" }}>
                  <LineChart
                    lineChartData={weeklyChartData}
                    lineChartOptions={weeklyChartOptions}
                  />
                </VuiBox>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card sx={{ padding: "24px", height: "100%", minHeight: "300px" }}>
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                  Daily PR Overview
                </VuiTypography>
                <VuiTypography variant="button" color="success" fontWeight="bold" mb="20px">
                  +0%{" "}
                  <VuiTypography variant="button" color="text" fontWeight="regular">
                    compared to yesterday
                  </VuiTypography>
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
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
