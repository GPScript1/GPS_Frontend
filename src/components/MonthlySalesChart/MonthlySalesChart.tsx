"use client";

import { Chart } from "react-chartjs-2";
import { VentasData } from "@/interfaces/VentasData";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export const MonthlySalesChart = ({ data }: { data: VentasData }) => {
  const chartData = {
    labels: data.meses,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Ventas',
        data: data.ventas,
        backgroundColor: '#0ec7d3',
      },
      {
        type: 'line' as const,
        label: 'Tendencia',
        data: data.ventas,
        borderColor: '#6753c5',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow rounded p-4 w-full max-w-4xl border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Ventas por mes</h3>
      <Chart type='bar' data={chartData} options={options} />
    </div>
  );
};