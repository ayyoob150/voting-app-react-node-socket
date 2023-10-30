import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const PieChart = ({nominees, votes }) => {


  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: nominees,
    datasets: [
      {
        data: votes,
        backgroundColor: ["#DB4437", "#4285F4", "#F4B400", "#0F9D58"],
        hoverBackgroundColor: ["#ff0c0cbf", "#36A2EB", "#FFCE56", "#0F9D58cf"],
      },
    ],
  };
  return (
    <div className="flex justify-center max-h-96">
      <Doughnut data={data} />
    </div>
  );
};

export default PieChart;
