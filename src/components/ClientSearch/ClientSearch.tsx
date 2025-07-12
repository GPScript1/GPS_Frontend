"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const ClientSearch = () => {
  return (
    <div className="relative max-w-sm w-full">
      <Input
        type="text"
        placeholder="Buscar cliente..."
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
    </div>
  );
};
