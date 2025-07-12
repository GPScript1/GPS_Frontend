// src/services/dashboardService.ts
import { ApiBackend } from "@/clients/axios";
import { ClienteCluster } from "@/interfaces/ClienteCluster";

export async function getClientesCluster(): Promise<ClienteCluster[]> {
  const response = await ApiBackend.post("/api/dato/promedio");
  return response.data;
}



export async function getMontoTotal(): Promise<number> {
  const response = await ApiBackend.post("/api/dato/monto-total");
  return response.data.monto; 
}


export async function getPromedioDiasPago(): Promise<number> {
  const response = await ApiBackend.post("/api/dato/promedio");
  const data = response.data;

  const total = data.reduce((acc: number, item: any) => acc + item.promedioInicioFacturaFinPagado, 0);
  return total / data.length;
}
