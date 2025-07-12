"use client";

import { useEffect, useState } from "react";
import { RiskTable } from "@/components/RiskTable/RiskTable";
import { ClienteCluster } from "@/interfaces/ClienteCluster";
import { getClientesCluster, getMontoTotal, getPromedioDiasPago } from "@/services/dashboardService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


export default function HomePage() {
  const [clientes, setClientes] = useState<ClienteCluster[]>([]);
  const [montoTotal, setMontoTotal] = useState<number>(0);
  const [promedioDias, setPromedioDias] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesData, total, promedio] = await Promise.all([
          getClientesCluster(),
          getMontoTotal(),
          getPromedioDiasPago(),
        ]);
        setClientes(clientesData);
        setMontoTotal(total);
        setPromedioDias(promedio);
      } catch (error) {
        console.error("Error obteniendo datos desde backend:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
        Predictor de Comportamiento Financiero
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border shadow-md p-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm text-muted-foreground font-semibold">
              Pronóstico de Ventas Totales
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl font-bold text-orange-600">
              ${montoTotal.toLocaleString("es-CL")}
            </p>
            <p className="text-xs text-muted-foreground">Monto acumulado por ventas</p>
          </CardContent>
        </Card>

        <Card className="border shadow-md p-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm text-muted-foreground font-semibold">
              Días Promedio de Pago
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl font-bold text-blue-600">
              {promedioDias.toFixed(2)} días
            </p>
            <p className="text-xs text-muted-foreground">Tiempo estimado promedio de pago</p>
          </CardContent>
        </Card>
      </div>

      <RiskTable clientes={clientes} />
    </div>
  );
}
