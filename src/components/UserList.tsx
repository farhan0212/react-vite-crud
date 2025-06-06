type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export default function UserList({ users, onEdit, onDelete }: Props) {
  if (users.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        Tidak ada user yang tersedia
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {users.map((user) => (
        <li
          key={user.id}
          className="py-4 flex flex-col sm:flex-row sm:items-center justify-between group hover:bg-gray-50 px-2 rounded-md transition-all">
          <div>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(user)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-all text-sm">
              Edit
            </button>
            <button
              onClick={() => onDelete(user.id)}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-all text-sm">
              Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
