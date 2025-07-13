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
  
  // Estados para el filtro de fecha
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Generar opciones de meses
  const meses = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  // Generar opciones de años (desde 2020 hasta el año actual)
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() retorna 0-11
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);

  // Inicializar con mes y año actual
  useEffect(() => {
    const now = new Date();
    setSelectedMonth(String(now.getMonth() + 1).padStart(2, '0'));
    setSelectedYear(String(now.getFullYear()));
  }, []);

  // Función para simular datos filtrados según mes/año
  const getFilteredData = (month: string, year: string) => {
    // Simulación de datos variables según mes/año
    const baseMultiplier = parseInt(month) * 0.1 + parseInt(year.slice(-2)) * 0.01;
    
    return {
      montoTotal: Math.floor(125000000 * (1 + baseMultiplier)),
      promedioDias: Math.floor(45 * (1 + baseMultiplier * 0.5)),
      riesgoCritico: Math.floor(10 * (1 + baseMultiplier)),
      riesgoAlto: Math.floor(91 * (1 + baseMultiplier * 0.8)),
      riesgoMedio: Math.floor(240 * (1 + baseMultiplier * 0.6)),
      riesgoBajo: Math.floor(180 * (1 + baseMultiplier * 0.4)),
    };
  };

  // Obtener datos filtrados
  const filteredData = selectedMonth && selectedYear 
    ? getFilteredData(selectedMonth, selectedYear)
    : {
        montoTotal,
        promedioDias,
        riesgoCritico: 10,
        riesgoAlto: 91,
        riesgoMedio: 240,
        riesgoBajo: 180,
      };

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

      {/* Filtros de Fecha */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="text-sm font-medium text-gray-700">Filtrar por período:</div>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Mes</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar mes</option>
              {meses.map((mes) => {
                // Deshabilitar meses futuros si es el año actual
                const isCurrentYear = parseInt(selectedYear) === currentYear;
                const isDisabled = isCurrentYear && parseInt(mes.value) > currentMonth;
                
                return (
                  <option 
                    key={mes.value} 
                    value={mes.value}
                    disabled={isDisabled}
                    style={{ color: isDisabled ? '#999' : 'inherit' }}
                  >
                    {mes.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Año</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar año</option>
              {years.map((year) => {
                // No permitir seleccionar meses futuros del año actual
                const isCurrentYear = year === currentYear;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {selectedMonth && selectedYear && (
          <div className="text-sm text-blue-600 font-medium">
            Mostrando datos de {meses.find(m => m.value === selectedMonth)?.label} {selectedYear}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border shadow-md p-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-ms text-muted-foreground font-semibold">
              Pronóstico de Pagos Totales para el mes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl font-bold">
              ${filteredData.montoTotal.toLocaleString("es-CL")}
            </p>
            <p className="text-xs text-muted-foreground">Monto de ventas anteriores estimado al mes elegido</p>
          </CardContent>
        </Card>

        <Card className="border shadow-md p-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-ms text-muted-foreground font-semibold">
              Promedio de atraso de pagos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl font-bold">
              {filteredData.promedioDias.toFixed(2)} días
            </p>
            <p className="text-xs text-muted-foreground">Tiempo estimado promedio de pago</p>
          </CardContent>
        </Card>


        <Card className="border shadow-md p-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-ms text-muted-foreground font-semibold">
              Clientes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl font-bold">
              1352
            </p>
            <p className="text-xs text-muted-foreground">Clasificación según días de demora</p>
          </CardContent>
        </Card>

        <Card className="border shadow-md p-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-ms text-muted-foreground font-semibold">
              Clientes con Riesgo Crítico
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl font-bold text-red-600">
              {filteredData.riesgoCritico}
            </p>
            <p className="text-xs text-muted-foreground">Clasificación según días de demora</p>
          </CardContent>
        </Card>

        


        <Card className="border shadow-md p-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-ms text-muted-foreground font-semibold">
              Clientes con Riesgo Alto
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl font-bold text-orange-600">
              {filteredData.riesgoAlto}
            </p>
            <p className="text-xs text-muted-foreground">Clasificación según días de demora</p>
          </CardContent>
        </Card>

        <Card className="border shadow-md p-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-ms text-muted-foreground font-semibold">
              Clientes con Riesgo Medio
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl font-bold text-yellow-600">
              {filteredData.riesgoMedio}
            </p>
            <p className="text-xs text-muted-foreground">Clasificación según días de demora</p>
          </CardContent>
        </Card>
        
        <Card className="border shadow-md p-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-ms text-muted-foreground font-semibold">
              Clientes con Riesgo Bajo
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl font-bold text-green-600">
              {filteredData.riesgoBajo}
            </p>
            <p className="text-xs text-muted-foreground">Clasificación según días de demora</p>
          </CardContent>
        </Card>
      </div>

      <RiskTable />
    </div>
  );
}
