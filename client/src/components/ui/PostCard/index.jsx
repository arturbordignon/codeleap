import styles from "./PostCard.module.css";
import { formatTimeAgo } from "../../../lib/time";
import editIcon from "../../../assets/edit.svg";
import deleteIcon from "../../../assets/delete.svg";

export function PostCard({ post, currentUser, onEdit, onDelete, onMentionClick }) {
  const canEdit = currentUser && post?.username === currentUser;

  return (
    <article className={styles.card} aria-label={`Post ${post?.title ?? ""}`}>
      <header className={styles.top}>
        <h3 className={styles.title}>{post.title}</h3>
        {canEdit && (
          <div className={styles.actions}>
            <button type="button" className={styles.iconBtn} onClick={onEdit} title="Edit">
              <img src={editIcon} alt="Edit" width="31.2" height="30" />
            </button>
            <button type="button" className={styles.iconBtn} onClick={onDelete} title="Delete">
              <img src={deleteIcon} alt="Delete" width="31.2" height="30" />
            </button>
          </div>
        )}
      </header>
      <section className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.user}>@{post.username}</span>
          <time className={styles.time} dateTime={post.created_datetime}>
            {formatTimeAgo(post.created_datetime)}
          </time>
        </div>
        <p className={styles.content}>{post.content}</p>
      </section>
    </article>
  );
}
