'use client';

import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch(
      formData.get('query') as string,
      formData.get('location') as string
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-4xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-lg sm:flex-row"
    >
      <div className="flex flex-1 items-center gap-2 rounded-xl px-4 py-2 hover:bg-gray-50">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="query"
          placeholder="Job title, keywords, or company..."
          className="w-full bg-transparent p-2 text-gray-900 placeholder:text-gray-500 focus:outline-none"
        />
      </div>
      <div className="hidden h-10 w-px bg-gray-200 sm:block" />
      <div className="flex flex-1 items-center gap-2 rounded-xl px-4 py-2 hover:bg-gray-50">
        <MapPin className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="location"
          placeholder="City, state, or remote..."
          className="w-full bg-transparent p-2 text-gray-900 placeholder:text-gray-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-8 py-4 px-6 font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Search Jobs
      </button>
    </form>
  );
}
