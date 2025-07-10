import type { SortDirection, SortField } from "@/atom/types";


interface SortIconProps {
  field: SortField;
  currentField: SortField;
  direction: SortDirection;
}

const SortIcon = ({ field, currentField, direction }: SortIconProps) => {
  const isActive = field === currentField;

  return (
    <div className="flex flex-col">
      <svg
        className={`w-4 h-4 ${
          isActive && direction === 'asc' ? 'text-purple-700' : 'text-gray-400'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M7 10l5-5 5 5H7z" />
      </svg>
      <svg
        className={`w-4 h-4 -mt-1.5 ${
          isActive && direction === 'desc' ? 'text-purple-700' : 'text-gray-400'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M7 10l5 5 5-5H7z" />
      </svg>
    </div>
  );
};

export default SortIcon;