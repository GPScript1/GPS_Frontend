"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const ClientSearch = () => {
  const handleSearch = () => {
    // Aquí se puede agregar la lógica de búsqueda
    console.log("Buscando cliente...");
  };

  return (
    <div className="flex items-center gap-2 max-w-md w-full">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Buscar cliente..."
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
      </div>
      <Button 
        onClick={handleSearch}
        className="bg-[var(--insecap-primary)] hover:bg-[var(--insecap-primary-dark)] text-white px-4 py-2"
      >
        Buscar
      </Button>
    </div>
  );
};
