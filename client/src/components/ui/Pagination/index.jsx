import styles from "./Pagination.module.css";

export function Pagination({ page, total, limit, onPage }) {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));
  if (totalPages <= 1) {
    return null;
  }

  const pages = [];
  const maxShown = 5;
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + maxShown - 1);

  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  return (
    <nav className={styles.wrap} aria-label="Pagination">
      <button className={styles.nav} disabled={page <= 1} onClick={() => onPage(1)}>
        &laquo;
      </button>
      <button className={styles.nav} disabled={page <= 1} onClick={() => onPage(page - 1)}>
        &lsaquo;
      </button>

      {start > 1 && <span className={styles.ellipsis}>…</span>}
      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.page} ${p === page ? styles.active : ""}`}
          onClick={() => onPage(p)}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}
      {end < totalPages && <span className={styles.ellipsis}>…</span>}
      <button className={styles.nav} disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
        &rsaquo;
      </button>
      <button
        className={styles.nav}
        disabled={page >= totalPages}
        onClick={() => onPage(totalPages)}
      >
        &raquo;
      </button>
    </nav>
  );
}
