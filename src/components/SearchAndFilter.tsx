"use client";

import * as React from "react";

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-4 mt-4 mb-8 justify-between"
    >
      <div className="flex flex-row w-full">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="flex flex-row w-full m-0 flex-start justify-between lg:w-[30%] lg:justify-normal lg:gap-4">
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
      </div>
    </form>
  );
}
