import styles from "./Input.module.css";

export function Input({ as = "input", className = "", ...props }) {
  const Tag = as; // "input" or "textarea"
  return <Tag className={`${styles.input} ${className}`} {...props} />;
}
