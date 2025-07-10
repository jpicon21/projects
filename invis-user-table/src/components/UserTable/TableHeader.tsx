import type { ColumnConfig, AugmentedUser, SortField, SortDirection } from "@/atom/types";
import SortIcon from "./SortIcon";



interface TableHeaderProps {
  columns: ColumnConfig<AugmentedUser>[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const TableHeader = ({ columns, sortField, sortDirection, onSort }: TableHeaderProps) => {
  return (
    <thead className="bg-gray-100 border-b-2 border-gray-200">
      <tr>
        {columns.map(({ field, label }) => (
          <th
            key={field}
            onClick={() => onSort(field)}
            className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={sortField === field ? 'text-purple-700' : ''}>
                {label}
              </span>
              <SortIcon field={field} currentField={sortField} direction={sortDirection} />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;