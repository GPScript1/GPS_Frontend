"use client";

import ScatterChart from "@/components/ScatterChart/ScatterChart";
import { ClienteCluster } from "@/interfaces/ClienteCluster";
import { useState } from "react";

export const HistoricalPage = () => {
    const [clientes] = useState<ClienteCluster[]>([]);
    

    return (
        <>
            <h2 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ventas Generadas Meses Anteriores</h2>
            {clientes.length > 0 ? (
                <ScatterChart data={clientes} />
            ) : (
                <p className="text-gray-500">Cargando gráfico...</p>
            )}
        </>
    );
}