"use client";

import ScatterChart from "@/components/ScatterChart/ScatterChart";
import SearchBar from "@/components/Search/Search";
import { ClienteCluster } from "@/interfaces/ClienteCluster";
import { useState } from "react";


export const CustomerPage = () => {
    const [clientes] = useState<ClienteCluster[]>([]);
    

    return (
        <>
            
            <h2 className="text-2xl font-bold mb-4">Segmentación de Clientes por Riesgo</h2>
            {clientes.length > 0 ? (
                <ScatterChart data={clientes} />
            ) :(
                <p className="text-gray-500">Cargando gráfico...</p>
            )}
            <SearchBar />
        </>
    );
}