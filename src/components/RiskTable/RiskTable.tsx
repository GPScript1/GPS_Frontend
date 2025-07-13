"use client";

import { AlertCircle, CheckCircle, Info, ShieldAlert, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, HelpCircle } from "lucide-react";
import { useState, useMemo } from "react";

type SortField = 'nombreCliente' | 'diasDemoraPredicho' | 'promedioInicioFacturaFinPagado' | 'promedioInicioVentaFinPagado' | 'fechaEstimadaPago' | 'categoriaRiesgo';
type SortDirection = 'asc' | 'desc' | null;

export const RiskTable = () => {
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Estados para ordenamiento
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Estado para el tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  // Datos de 20 clientes
  const clientes = [
    {
      nombreCliente: "Komatsu Chile",
      diasDemoraPredicho: 85,
      promedioInicioFacturaFinPagado: 55,
      promedioInicioVentaFinPagado: 92,
      fechaEstimadaPago: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Medio",
    },
    {
      nombreCliente: "Codelco Norte",
      diasDemoraPredicho: 112,
      promedioInicioFacturaFinPagado: 71,
      promedioInicioVentaFinPagado: 125,
      fechaEstimadaPago: new Date(Date.now() + 112 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Alto",
    },
    {
      nombreCliente: "VULCO S.A",
      diasDemoraPredicho: 121,
      promedioInicioFacturaFinPagado: 66,
      promedioInicioVentaFinPagado: 138,
      fechaEstimadaPago: new Date(Date.now() + 121 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Crítico",
    },
    {
      nombreCliente: "Antofagasta Minerals",
      diasDemoraPredicho: 39,
      promedioInicioFacturaFinPagado: 21,
      promedioInicioVentaFinPagado: 45,
      fechaEstimadaPago: new Date(Date.now() + 39 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Bajo",
    },
    {
      nombreCliente: "Minera Escondida Ltda.",
      diasDemoraPredicho: 98,
      promedioInicioFacturaFinPagado: 59,
      promedioInicioVentaFinPagado: 110,
      fechaEstimadaPago: new Date(Date.now() + 98 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Alto",
    },
    {
      nombreCliente: "SQM Salar",
      diasDemoraPredicho: 64,
      promedioInicioFacturaFinPagado: 40,
      promedioInicioVentaFinPagado: 78,
      fechaEstimadaPago: new Date(Date.now() + 64 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Medio",
    },
    {
      nombreCliente: "ENAEX Servicios",
      diasDemoraPredicho: 28,
      promedioInicioFacturaFinPagado: 18,
      promedioInicioVentaFinPagado: 35,
      fechaEstimadaPago: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Bajo",
    },
    {
      nombreCliente: "Ferrovial Chile",
      diasDemoraPredicho: 76,
      promedioInicioFacturaFinPagado: 49,
      promedioInicioVentaFinPagado: 88,
      fechaEstimadaPago: new Date(Date.now() + 76 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Medio",
    },
    {
      nombreCliente: "TecnoExplora S.A.",
      diasDemoraPredicho: 109,
      promedioInicioFacturaFinPagado: 72,
      promedioInicioVentaFinPagado: 122,
      fechaEstimadaPago: new Date(Date.now() + 109 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Alto",
    },
    {
      nombreCliente: "Servicios Integra Ltda.",
      diasDemoraPredicho: 134,
      promedioInicioFacturaFinPagado: 80,
      promedioInicioVentaFinPagado: 150,
      fechaEstimadaPago: new Date(Date.now() + 134 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Crítico",
    },
    {
      nombreCliente: "Grupo Falabella",
      diasDemoraPredicho: 45,
      promedioInicioFacturaFinPagado: 32,
      promedioInicioVentaFinPagado: 52,
      fechaEstimadaPago: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Bajo",
    },
    {
      nombreCliente: "Ripley Corp Chile",
      diasDemoraPredicho: 67,
      promedioInicioFacturaFinPagado: 44,
      promedioInicioVentaFinPagado: 79,
      fechaEstimadaPago: new Date(Date.now() + 67 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Medio",
    },
    {
      nombreCliente: "Cencosud Retail",
      diasDemoraPredicho: 89,
      promedioInicioFacturaFinPagado: 58,
      promedioInicioVentaFinPagado: 102,
      fechaEstimadaPago: new Date(Date.now() + 89 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Alto",
    },
    {
      nombreCliente: "Banco de Chile",
      diasDemoraPredicho: 23,
      promedioInicioFacturaFinPagado: 15,
      promedioInicioVentaFinPagado: 28,
      fechaEstimadaPago: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Bajo",
    },
    {
      nombreCliente: "ENTEL Chile S.A.",
      diasDemoraPredicho: 52,
      promedioInicioFacturaFinPagado: 35,
      promedioInicioVentaFinPagado: 63,
      fechaEstimadaPago: new Date(Date.now() + 52 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Medio",
    },
    {
      nombreCliente: "CAP Acero",
      diasDemoraPredicho: 104,
      promedioInicioFacturaFinPagado: 68,
      promedioInicioVentaFinPagado: 118,
      fechaEstimadaPago: new Date(Date.now() + 104 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Alto",
    },
    {
      nombreCliente: "Metrogas S.A.",
      diasDemoraPredicho: 41,
      promedioInicioFacturaFinPagado: 28,
      promedioInicioVentaFinPagado: 48,
      fechaEstimadaPago: new Date(Date.now() + 41 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Bajo",
    },
    {
      nombreCliente: "Chilectra S.A.",
      diasDemoraPredicho: 73,
      promedioInicioFacturaFinPagado: 46,
      promedioInicioVentaFinPagado: 85,
      fechaEstimadaPago: new Date(Date.now() + 73 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Medio",
    },
    {
      nombreCliente: "Constructora SALFACORP",
      diasDemoraPredicho: 127,
      promedioInicioFacturaFinPagado: 84,
      promedioInicioVentaFinPagado: 142,
      fechaEstimadaPago: new Date(Date.now() + 127 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Crítico",
    },
    {
      nombreCliente: "Empresas CMPC",
      diasDemoraPredicho: 91,
      promedioInicioFacturaFinPagado: 61,
      promedioInicioVentaFinPagado: 105,
      fechaEstimadaPago: new Date(Date.now() + 91 * 24 * 60 * 60 * 1000),
      categoriaRiesgo: "Alto",
    },
  ];

  // Configuración de categorías más llamativas
  const riesgoConfig = {
    "Crítico": { 
      color: "text-white", 
      bgColor: "bg-red-600", 
      borderColor: "border-red-700",
      Icon: ShieldAlert,
      order: 4
    },
    "Alto": { 
      color: "text-white", 
      bgColor: "bg-orange-500", 
      borderColor: "border-orange-600",
      Icon: AlertCircle,
      order: 3
    },
    "Medio": { 
      color: "text-gray-800", 
      bgColor: "bg-yellow-400", 
      borderColor: "border-yellow-500",
      Icon: Info,
      order: 2
    },
    "Bajo": { 
      color: "text-white", 
      bgColor: "bg-green-600", 
      borderColor: "border-green-700",
      Icon: CheckCircle,
      order: 1
    },
  };

  // Función para manejar el ordenamiento
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Si ya está ordenado por este campo, cambiar dirección
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      // Nuevo campo, empezar con ascendente
      setSortField(field);
      setSortDirection('asc');
    }
    // Resetear a la primera página cuando se ordena
    setCurrentPage(1);
  };

  // Función para obtener el ícono de ordenamiento
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="w-4 h-4 text-blue-600" />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDown className="w-4 h-4 text-blue-600" />;
    }
    return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
  };

  // Datos ordenados usando useMemo para optimización
  const sortedClientes = useMemo(() => {
    if (!sortField || !sortDirection) {
      return clientes;
    }

    return [...clientes].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Ordenamiento especial para categoría de riesgo
      if (sortField === 'categoriaRiesgo') {
        aValue = riesgoConfig[aValue as keyof typeof riesgoConfig]?.order || 0;
        bValue = riesgoConfig[bValue as keyof typeof riesgoConfig]?.order || 0;
      }

      // Ordenamiento para fechas
      if (sortField === 'fechaEstimadaPago') {
        aValue = aValue.getTime();
        bValue = bValue.getTime();
      }

      // Ordenamiento para strings
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [clientes, sortField, sortDirection]);

  // Cálculos de paginación usando datos ordenados
  const totalPages = Math.ceil(sortedClientes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = sortedClientes.slice(startIndex, endIndex);

  // Funciones de navegación
  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Clientes Analizados</h3>
        <div className="text-sm text-gray-600">
          Total: {clientes.length} clientes
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border-b">
                <button
                  onClick={() => handleSort('nombreCliente')}
                  className="flex items-center gap-2 font-semibold hover:text-blue-600 transition-colors"
                >
                  Cliente
                  {getSortIcon('nombreCliente')}
                </button>
              </th>
              <th className="px-4 py-3 border-b">
                <button
                  onClick={() => handleSort('diasDemoraPredicho')}
                  className="flex items-center gap-2 font-semibold hover:text-blue-600 transition-colors"
                >
                  Días estimados de pago tardío (desde venta)
                  {getSortIcon('diasDemoraPredicho')}
                </button>
              </th>
              <th className="px-4 py-3 border-b">
                <button
                  onClick={() => handleSort('promedioInicioVentaFinPagado')}
                  className="flex items-center gap-2 font-semibold hover:text-blue-600 transition-colors"
                >
                  Promedio Histórico de atraso (desde venta)
                  {getSortIcon('promedioInicioVentaFinPagado')}
                </button>
              </th>
              <th className="px-4 py-3 border-b">
                <button
                  onClick={() => handleSort('promedioInicioFacturaFinPagado')}
                  className="flex items-center gap-2 font-semibold hover:text-blue-600 transition-colors"
                >
                  Promedio Histórico de atraso (desde factura)
                  {getSortIcon('promedioInicioFacturaFinPagado')}
                </button>
              </th>
              
              <th className="px-4 py-3 border-b">
                <button
                  onClick={() => handleSort('fechaEstimadaPago')}
                  className="flex items-center gap-2 font-semibold hover:text-blue-600 transition-colors"
                >
                  Fecha estimada de pago
                  {getSortIcon('fechaEstimadaPago')}
                </button>
              </th>
              <th className="px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSort('categoriaRiesgo')}
                    className="flex items-center gap-2 font-semibold hover:text-blue-600 transition-colors"
                  >
                    Nivel de Atrasos
                    {getSortIcon('categoriaRiesgo')}
                  </button>
                  <div className="relative">
                    <button
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                    {showTooltip && (
                      <div className="absolute top-6 right-0 z-10 w-80 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                        <div className="space-y-2">
                          <p className="font-semibold">¿Cómo se calcula el Nivel de Atrasos?</p>
                          <p>Esta categorización se basa en un modelo de clasificación que analiza:</p>
                          <ul className="list-disc list-inside space-y-1 ml-2">
                            <li><strong>Días desde facturación hasta pago:</strong> Tiempo transcurrido desde que se emite la factura hasta que se recibe el pago</li>
                            <li><strong>Días desde venta hasta pago:</strong> Tiempo total desde el inicio de la comercialización hasta el pago completo</li>
                            <li><strong>Fecha estimada de pago:</strong> Calculada sumando los días estimados de pago tardío a la fecha actual</li>
                          </ul>
                          <div className="mt-2 pt-2 border-t border-gray-700">
                            <p className="font-semibold">Rangos de clasificación:</p>
                            <div className="grid grid-cols-2 gap-1 text-xs mt-1">
                              <span className="text-green-300">• Bajo: ≤30 días</span>
                              <span className="text-yellow-300">• Medio: 31-60 días</span>
                              <span className="text-orange-300">• Alto: 61-90 días</span>
                              <span className="text-red-300">• Crítico: &gt;90 días</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((cliente, index) => {
              const config = riesgoConfig[cliente.categoriaRiesgo as keyof typeof riesgoConfig];
              const Icon = config?.Icon ?? Info;
              const fechaFormateada = cliente.fechaEstimadaPago.toLocaleDateString('es-CL', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              });
              
              // Función para obtener el color del texto basado en el nivel de riesgo
              const getDiasColor = (categoria: string) => {
                switch (categoria) {
                  case 'Crítico':
                    return 'text-red-600 font-bold';
                  case 'Alto':
                    return 'text-orange-500 font-semibold';
                  case 'Medio':
                    return 'text-yellow-600 font-medium';
                  case 'Bajo':
                    return 'text-green-600 font-medium';
                  default:
                    return 'text-gray-700';
                }
              };
              
              return (
                <tr key={startIndex + index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 border-b font-medium">{cliente.nombreCliente}</td>
                  <td className={`px-4 py-3 border-b ${getDiasColor(cliente.categoriaRiesgo)}`}>
                    {cliente.diasDemoraPredicho} días
                  </td>
                  <td className="px-4 py-3 border-b">{cliente.promedioInicioVentaFinPagado} días</td>
                  
                  <td className="px-4 py-3 border-b">{cliente.promedioInicioFacturaFinPagado} días</td>
                  <td className="px-4 py-3 border-b font-medium text-blue-600">{fechaFormateada}</td>
                  <td className="px-4 py-3 border-b">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.bgColor} ${config.borderColor} ${config.color}`}>
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">
                        {cliente.categoriaRiesgo}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Mostrando {startIndex + 1} - {Math.min(endIndex, sortedClientes.length)} de {sortedClientes.length} clientes
          {sortField && sortDirection && (
            <span className="ml-2 text-blue-600">
              (ordenado por {sortField === 'nombreCliente' ? 'Cliente' : 
                          sortField === 'diasDemoraPredicho' ? 'Días estimados' :
                          sortField === 'promedioInicioFacturaFinPagado' ? 'Días promedio (factura)' :
                          sortField === 'promedioInicioVentaFinPagado' ? 'Días promedio (venta)' :
                          sortField === 'fechaEstimadaPago' ? 'Fecha estimada' :
                          'Nivel de Atrasos'} - {sortDirection === 'asc' ? 'Ascendente' : 'Descendente'})
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-2 rounded-md border transition-colors ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentPage === page
                    ? "bg-[var(--insecap-primary)] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-2 rounded-md border transition-colors ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
            }`}
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
