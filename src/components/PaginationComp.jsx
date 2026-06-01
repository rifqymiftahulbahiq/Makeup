export default function PaginationComp({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages < 1) return null;

  const pages = [];
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
  if (i > 0 && i <= totalPages) {
    pages.push(i);
  }
}

  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow">

        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Go Back
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-pink-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Go Forward
        </button>

      </div>
    </div>
  );
}