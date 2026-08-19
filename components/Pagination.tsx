import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const prevPage = currentPage - 1
  const nextPage = currentPage + 1

  return (
    <nav
      className="mt-14 flex items-center justify-center gap-4"
      aria-label="Pagination"
    >
      {prevPage >= 1 ? (
        <Link
          href={`${basePath}?page=${prevPage}`}
          className="px-4 py-2 rounded-full border border-sand-300 text-sand-700 hover:bg-sand-100 transition-colors font-medium"
        >
          ← Newer
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-full border border-sand-200 text-sand-300 font-medium">
          ← Newer
        </span>
      )}

      <span className="text-sand-600 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {nextPage <= totalPages ? (
        <Link
          href={`${basePath}?page=${nextPage}`}
          className="px-4 py-2 rounded-full border border-sand-300 text-sand-700 hover:bg-sand-100 transition-colors font-medium"
        >
          Older →
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-full border border-sand-200 text-sand-300 font-medium">
          Older →
        </span>
      )}
    </nav>
  )
}