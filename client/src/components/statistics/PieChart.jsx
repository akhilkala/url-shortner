import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ mobileVisits, DesktopVisits }) {
  const data = {
    labels: ["Mobile", "Desktop"],
    datasets: [
      {
        label: "Sales 2020 (M)",
        data: [mobileVisits, DesktopVisits],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(255, 205, 86, 1)"],
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
  };

  return <Pie data={data} options={options} />;
}

export default PieChart;
