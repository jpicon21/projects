import { usersAtom, loadingAtom, errorAtom, sortedUsersAtom, sortFieldAtom, sortDirectionAtom, cityPopulations } from "@/atom/atoms";
import type { User, AugmentedUser, SortField } from "@/atom/types";
import axios from "axios";
import { useSetAtom, useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import { tableColumns } from "./tableColumns";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const UserTable = () => {
  const setUsers = useSetAtom(usersAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const sortedUsers = useAtomValue(sortedUsersAtom);
  const [sortField, setSortField] = useAtom(sortFieldAtom);
  const [sortDirection, setSortDirection] = useAtom(sortDirectionAtom);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        
        const augmentedUsers: AugmentedUser[] = response.data.map(user => ({
          ...user,
          population: cityPopulations[user.address.city] || Math.floor(Math.random() * 30000) + 1000
        }));
        
        setUsers(augmentedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers, setLoading, setError]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="overflow-x-auto shadow-xl rounded-lg">
      <table className="min-w-full bg-white">
        <TableHeader
          columns={tableColumns}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedUsers.map((user) => (
            <TableRow key={user.id} user={user} columns={tableColumns} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;