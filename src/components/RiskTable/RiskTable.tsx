"use client";

import { ClienteCluster } from "@/interfaces/ClienteCluster";

interface Props {
  clientes: ClienteCluster[];
}

export const RiskTable = ({ clientes }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Clientes y Nivel de Riesgo</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">Nombre Cliente</th>
              <th className="px-4 py-2 border-b">Nivel de Riesgo</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{cliente.nombreCliente}</td>
                <td className="px-4 py-2 border-b">{cliente.categoriaRiesgo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
