import React from "react";
import Grid from "@mui/material/Grid";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

function PRCountCards({ prCount, repoCount }) {
  const cards = [
    {
      title: "Total PRs",
      count: prCount.total,
      icon: <span>📦</span>,
    },
    {
      title: "Daily PRs",
      count: prCount.daily,
      icon: <span>📅</span>,
    },
    {
      title: "Weekly PRs",
      count: prCount.weekly,
      icon: <span>📈</span>,
    },
    {
      title: "Repositories",
      count: repoCount,
      icon: <span>🗂️</span>,
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map(({ title, count, icon }, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <MiniStatisticsCard
            title={{ text: title }}
            count={count}
            icon={{ color: "info", component: icon }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default PRCountCards;
