import styles from "./Modal.module.css";

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  border = "strong",
  backdrop = "dim",
  className = "",
}) {
  if (!open) return null;

  const modalClass = [
    styles.modal,
    border === "soft" ? styles.borderSoft : styles.borderStrong,
    className,
  ].join(" ");

  const backdropClass =
    backdrop === "grey"
      ? styles.backdropGrey
      : backdrop === "none"
      ? styles.backdropNone
      : styles.backdropDim;

  return (
    <div className={`${styles.backdrop} ${backdropClass}`} onClick={onClose}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
