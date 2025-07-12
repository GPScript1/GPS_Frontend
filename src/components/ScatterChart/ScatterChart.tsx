// src/components/ScatterChart.tsx
"use client";

import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(PointElement, LinearScale, Tooltip, Legend, Title);

interface ClienteCluster {
  nombreCliente: string;
  promedioInicioFacturaFinPagado: number;
  promedioInicioComFinPagado: number;
  categoriaRiesgo: string;
  color: string;
}

interface Props {
  data: ClienteCluster[];
}

export default function ScatterChart({ data }: Props) {
  const chartData = {
    datasets: data.map((cliente) => ({
      label: cliente.nombreCliente,
      data: [{
        x: cliente.promedioInicioFacturaFinPagado,
        y: cliente.promedioInicioComFinPagado,
      }],
      backgroundColor: cliente.color,
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Clusters de Clientes" },
    },
    scales: {
      x: { title: { display: true, text: "Inicio Factura → Pagado (días)" } },
      y: { title: { display: true, text: "Inicio Comercialización → Pagado (días)" } }
    }
  };

  return <Scatter data={chartData} options={options} />;
}
