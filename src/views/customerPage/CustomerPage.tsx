
"use client";

import { useEffect, useState } from "react";
import { ClientSearch } from "@/components/ClientSearch/ClientSearch";
import { ForecastCard } from "@/components/ForecastCard/ForecastCard";
import { MonthlySalesChart } from "@/components/MonthlySalesChart/MonthlySalesChart";
import { VentasData } from "@/interfaces/VentasData";
import { ApiBackend } from "@/clients/axios"; // ✅ debe ir aquí

export const CustomerPage = () => {
  const [ventasData, setVentasData] = useState<VentasData | null>(null);
  const [montoForecast, setMontoForecast] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiBackend.post("Dato/promedio");
        const promedioData = response.data; // tipo: PromedioSujeto[]

        // Simulación de transformación a VentasData y forecast
        const meses = [
          "Ene", "Feb", "Mar", "Abr", "May", "Jun",
          "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ];

        const ventas = meses.map(() => Math.floor(Math.random() * 100 + 30));

        setVentasData({ meses, ventas });
        setMontoForecast(ventas[ventas.length - 1] * 400000); // estimación ficticia CLP
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Segmentación de Clientes por Riesgo</h2>
      <ClientSearch />
      <ForecastCard monto={montoForecast} />
      {ventasData ? (
        <MonthlySalesChart data={ventasData} />
      ) : (
        <p className="text-gray-500">Cargando gráfico...</p>
      )}
    </div>
  );
};
