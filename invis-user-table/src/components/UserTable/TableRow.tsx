import type { AugmentedUser, ColumnConfig } from "@/atom/types";

interface TableRowProps {
  user: AugmentedUser;
  columns: ColumnConfig<AugmentedUser>[];
}

const TableRow = ({ user, columns }: TableRowProps) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {columns.map(({ field, render, className }) => (
        <td
          key={field}
          className={className || "px-6 py-4 whitespace-nowrap text-sm text-gray-900"}
        >
          {render ? render(user) : ''}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;