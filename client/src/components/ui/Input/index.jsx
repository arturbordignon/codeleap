import styles from "./Input.module.css";

export function Input({ as = "input", className = "", ...props }) {
  const Tag = as;
  return <Tag className={`${styles.input} ${className}`} {...props} />;
}
