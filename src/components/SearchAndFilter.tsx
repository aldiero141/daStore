"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

interface SearchAndFilterProps {
  onSearch: (search: string, filter: string) => void;
  filterOptions: { value: string; label: string }[];
}

export function SearchAndFilter({
  onSearch,
  filterOptions,
}: SearchAndFilterProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(filterOptions[0].value);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
    setFilter(searchParams.get("f") || "");
  }, [searchParams]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(search, filter);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mt-4 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
}
