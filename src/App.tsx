import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import type { ChangeEvent, FormEvent } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

interface PaginatedResponse {
  data: User[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const [total, setTotal] = useState<number>(0);
  const [totalpages, setTotalPages] = useState<number>(1);

  // Remove this line, as totalpages is set from API response
  // totalPages = Math.ceil(total / limit);

  const apiURL = "http://localhost:8080/users";

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get<PaginatedResponse>(
        `${apiURL}?page=${page}&limit=${limit}`
      );
      setUsers(res.data.data);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("failed to fetch users", error);
    }
  }, [apiURL, page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${apiURL}/${editId}`, form, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await axios.post(apiURL, form, {
          headers: { "Content-Type": "application/json" },
        });
      }
      setForm({ name: "", email: "" });
      setEditId(null);
      fetchUsers();
    } catch (error) {
      console.error("failed to submit user", error);
    }
  };

  const handleEdit = (user: User) => {
    setForm({ name: user.name, email: user.email });
    setEditId(user.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus user ini?")) {
      try {
        await axios.delete(`${apiURL}/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("failed to delete user", error);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {editId ? "Edit User" : "Tambah User"}
              </h2>
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end">
                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Masukkan nama"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Masukkan email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className=" text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-md text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                        editId
                          ? "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500"
                          : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                      }`}>
                      {editId ? "Update" : "Tambah"}
                    </button>

                    {editId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditId(null);
                          setForm({ name: "", email: "" });
                        }}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">
                        Batal
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Daftar User
            </h3>

            {!users || users.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Tidak ada user yang tersedia
              </p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between group hover:bg-gray-50 px-2 rounded-md transition-all">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <div className="flex space-x-2 self-end sm:self-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-all text-sm">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-all text-sm">
                        Hapus
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {totalpages > 1 && (
              <div className="flex justify-center items-center gap-2 py-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`px-3 py-1 rounded-md ${
                    page === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  } transition-all`}>
                  Prev
                </button>
                {Array.from({ length: totalpages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-3 py-1 rounded-md ${
                        page === p
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                      } transition-all`}>
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPage((p) => Math.min(totalpages, p + 1))}
                  disabled={page === totalpages}
                  className={`px-3 py-1 rounded-md ${
                    page === totalpages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  } transition-all`}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
