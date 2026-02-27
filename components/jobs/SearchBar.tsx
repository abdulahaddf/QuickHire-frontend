'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ onSearch, placeholder = "Job title, company, or keywords", className = "" }: SearchBarProps) {
  return (
    <div className={`relative flex w-full items-center ${className}`}>
      <Search className="absolute left-4 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
    </div>
  );
}
