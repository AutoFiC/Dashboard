import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function BarChart({ barChartData, barChartOptions }) {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const dataLength = barChartData?.[0]?.data?.length || 0;
    const columnWidth = dataLength >= 5 ? "40%" : "40px";

    const enhancedOptions = {
      ...barChartOptions,
      colors: ["#1d4d94ff"],
      plotOptions: {
        ...barChartOptions.plotOptions,
        bar: {
          ...barChartOptions.plotOptions?.bar,
          columnWidth,
          distributed: true,
          backgroundBarColors: ["#001f3f"],
        },
      },
      xaxis: {
        ...barChartOptions.xaxis,
        labels: {
          ...barChartOptions.xaxis?.labels,
          rotate: -45,
          style: {
            fontSize: "12px",
            colors: "#ccc",
          },
        },
      },
      legend: {
        show: false,
      },
    };

    setChartData(barChartData);
    setChartOptions(enhancedOptions);
  }, [barChartData, barChartOptions]);

  if (
    !chartData ||
    chartData.length === 0 ||
    !chartData[0].data ||
    chartData[0].data.length === 0
  ) {
    return <div>Loading chart...</div>;
  }

  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="bar"
      width="100%"
      height="100%"
    />
  );
}

export default BarChart;
