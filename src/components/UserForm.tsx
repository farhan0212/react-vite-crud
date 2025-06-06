import type { ChangeEvent, FormEvent } from "react";

type Props = {
  form: { name: string; email: string };
  editId: number | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export default function UserForm({
  form,
  editId,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 md:space-y-0 md:flex md:gap-6 md:items-end bg-white p-6 rounded-xl shadow-xl border border-gray-100">
      <div className="flex-1 relative">
        <label
          htmlFor="name"
          className={`absolute left-10 top-2 text-gray-500 text-xs transition-all pointer-events-none ${
            form.name ? "text-indigo-600 -top-4 bg-white px-1" : ""
          }`}>
          <span className="inline-block align-middle">Nama</span>
        </label>
        <span className="absolute left-3 top-2.5 text-indigo-400">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            />
          </svg>
        </span>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={onChange}
          required
          placeholder=" "
          className="pl-10 pr-3 py-2 mt-1 block w-full border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all text-black bg-gray-50"
        />
      </div>

      <div className="flex-1 relative">
        <label
          htmlFor="email"
          className={`absolute left-10 top-2 text-gray-500 text-xs transition-all pointer-events-none ${
            form.email ? "text-indigo-600 -top-4 bg-white px-1" : ""
          }`}>
          <span className="inline-block align-middle">Email</span>
        </label>
        <span className="absolute left-3 top-2.5 text-indigo-400">
          {/* Mail Icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M21 8.5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.5m18-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v-.5m18 0-9 6-9-6"
            />
          </svg>
        </span>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={onChange}
          required
          placeholder=" "
          className="pl-10 pr-3 py-2 mt-1 block w-full border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all text-black bg-gray-50"
        />
      </div>

      <div className="flex space-x-2 mt-4 md:mt-0">
        <button
          type="submit"
          className={`px-5 py-2 rounded-lg text-white font-semibold shadow-md focus:outline-none transition-all ${
            editId
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}>
          {editId ? (
            <span className="flex items-center gap-2">
              {/* Pencil Icon */}
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="m16.475 5.408 2.117-2.116a2 2 0 1 1 2.829 2.828l-2.116 2.117m-2.83-2.83L4.293 18.293a1 1 0 0 0-.263.465l-1 4a1 1 0 0 0 1.213 1.213l4-1a1 1 0 0 0 .465-.263L18.592 7.525m-2.83-2.83 2.83 2.83"
                />
              </svg>
              Update
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {/* Plus Icon */}
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah
            </span>
          )}
        </button>
        {editId && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-semibold shadow-md">
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
