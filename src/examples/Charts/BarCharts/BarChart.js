import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function BarChart({ barChartData, barChartOptions }) {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // 바 차트 옵션에 진한 색상과 고정된 바 너비 설정 병합
    const enhancedOptions = {
      ...barChartOptions,
      colors: ["#1d4d94ff"], // 진한 파랑색 지정
      plotOptions: {
        ...barChartOptions.plotOptions,
        bar: {
          ...barChartOptions.plotOptions?.bar,
          columnWidth: "40px", // 바 너비 고정 (px 단위 가능)
          backgroundBarColors: ["#001f3f"], // 배경 바 색상 진하게
        },
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
