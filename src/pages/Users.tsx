import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import Pagination from "../components/Paginations";

type User = { id: number; name: string; email: string };
type PaginatedResponse = {
  data: User[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiURL = "/api/users";

  const fetchUsers = useCallback(async () => {
    const res = await axios.get<PaginatedResponse>(
      `${apiURL}?page=${page}&limit=10`
    );
    setUsers(res.data.data);
    setTotalPages(res.data.totalPages);
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${apiURL}/${editId}`, form);
    } else {
      await axios.post(apiURL, form);
    }
    setForm({ name: "", email: "" });
    setEditId(null);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setForm({ name: user.name, email: user.email });
    setEditId(user.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus user ini?")) {
      await axios.delete(`${apiURL}/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <UserForm
        form={form}
        editId={editId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          setForm({ name: "", email: "" });
          setEditId(null);
        }}
      />

      <div className="mt-8">
        <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
