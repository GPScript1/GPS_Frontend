"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full max-w-sm">
      <Input
        type="text"
        placeholder="Buscar cliente..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-4 pr-10 py-2 rounded-full bg-white border border-gray-300 focus-visible:ring-2 focus-visible:ring-primary"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
    </div>
  );
}
