"use client";


export const ForecastCard = ({ monto }: {monto: number;}) => {
  const formatter = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-white shadow rounded p-4 max-w-xs w-full border border-gray-200">
      <p className="text-sm font-semibold text-gray-600 mb-1">Pronóstico de ventas</p>
      <p className="text-2xl font-bold text-red-600">{formatter.format(monto)}</p>
      <p className="text-xs text-gray-400 mt-1">Venta esperada para este mes</p>
    </div>
  );
};
