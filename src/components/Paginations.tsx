type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageButtons = [];

  const maxVisible = 5;
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, page + 2);

  if (page <= 3) {
    end = Math.min(totalPages, maxVisible);
  } else if (page >= totalPages - 2) {
    start = Math.max(1, totalPages - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-3 py-1 rounded-md ${
          page === i
            ? "bg-indigo-600 text-white"
            : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
        } transition-all`}>
        {i}
      </button>
    );
  }

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 rounded-md ${
          page === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
        } transition-all`}>
        Prev
      </button>

      {pageButtons}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded-md ${
          page === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
        } transition-all`}>
        Next
      </button>
    </div>
  );
}
