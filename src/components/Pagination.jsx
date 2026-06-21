/**
 * Pagination controls for the podcast list.
 *
 * @param {object} props Pagination props.
 * @param {number} props.currentPage Current active page.
 * @param {number} props.totalPages Total number of pages.
 * @param {Function} props.onPageChange Page setter.
 * @returns {JSX.Element} Pagination component.
 */
export function Pagination({ currentPage, totalPages, onPageChange }) {
  const canGoBackward = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  return (
    <nav className="pagination" aria-label="Podcast pagination">
      <button type="button" onClick={() => onPageChange(1)} disabled={!canGoBackward}>
        First
      </button>
      <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={!canGoBackward}>
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={!canGoForward}>
        Next
      </button>
      <button type="button" onClick={() => onPageChange(totalPages)} disabled={!canGoForward}>
        Last
      </button>
    </nav>
  );
}