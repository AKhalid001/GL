import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Task pagination">
      <ul className={styles.pagination}>
        <li>
          <button
            className={`${styles.pageBtn} ${page === 0 ? styles.disabled : ""}`}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
          >
            <i className="bi bi-chevron-left" />
          </button>
        </li>

        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <button
              className={`${styles.pageBtn} ${page === index ? styles.active : ""}`}
              onClick={() => onPageChange(index)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            className={`${styles.pageBtn} ${page >= totalPages - 1 ? styles.disabled : ""}`}
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages - 1}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
