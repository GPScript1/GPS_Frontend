"use client";

import ScatterChart from "@/components/ScatterChart/ScatterChart";
import type { ClienteCluster } from "@/interfaces/ClienteCluster";
import { useState } from "react";

export const HistoricalPage = () => {
    const [clientes] = useState<ClienteCluster[]>([]);
    

    return (
        <div className="p-6 space-y-8">
            <h2 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ventas Históricas</h2>
            
        </div>
    );
}