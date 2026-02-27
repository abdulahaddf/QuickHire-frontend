'use client';

interface JobFiltersProps {
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  categories: string[];
  locations: string[];
}

export function JobFilters({ onCategoryChange, onLocationChange, categories, locations }: JobFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onLocationChange(e.target.value)}
        className="px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <option value="">All Locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
}
