import React from "react";
import Grid from "@mui/material/Grid";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

function PRCountCards({ prCount, repoCount }) {
  const cards = [
    { title: "Total PRs", count: prCount.total, icon: <span>📦</span> },
    { title: "Daily PRs", count: prCount.daily, icon: <span>📅</span> },
    { title: "Weekly PRs", count: prCount.weekly, icon: <span>📈</span> },
    { title: "Repositories", count: repoCount, icon: <span>🗂️</span> },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <MiniStatisticsCard
            title={{ text: item.title }}
            count={item.count}
            percentage={{ color: "success", text: "+0%" }}
            icon={{ color: "info", component: item.icon }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default PRCountCards;
