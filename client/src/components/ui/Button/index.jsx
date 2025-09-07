import styles from "./Button.module.css";

export function Button({
  variant = "primary",
  width,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  style: userStyle,
  children,
  ...props
}) {
  const classMap = {
    primary: styles.primary,
    danger: styles.danger,
    success: styles.success,
    ghost: styles.ghost,
  };

  const mergedStyle = {
    ...(width != null ? { width: typeof width === "number" ? `${width}px` : width } : null),
    ...userStyle,
  };

  return (
    <button
      type={type}
      className={`${styles.base} ${classMap[variant]} ${className}`.trim()}
      style={mergedStyle}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
