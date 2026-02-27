'use client';

interface JobFiltersProps {
  onFilterChange: (filters: { type: string; category: string }) => void;
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="mb-3 font-medium text-gray-700">Job Type</h4>
          <div className="space-y-2 text-sm text-gray-600">
            {['Full-time', 'Part-time', 'Contract', 'Freelance'].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => {
                    // In a real app, this would be more complex to handle multiple selections
                    if (e.target.checked) onFilterChange({ type, category: '' });
                  }}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        <div>
          <h4 className="mb-3 font-medium text-gray-700">Categories</h4>
          <div className="space-y-2 text-sm text-gray-600">
            {['Engineering', 'Design', 'Marketing', 'Sales', 'Product'].map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => {
                    if (e.target.checked) onFilterChange({ type: '', category });
                  }}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
