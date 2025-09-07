import { useMemo, useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { PostCard } from "../../components/ui/PostCard";
import { Modal } from "../../components/ui/Modal";
import { Pagination } from "../../components/ui/Pagination";
import { usePosts } from "../../store/postsStore";
import exitIcon from "../../assets/exit.svg";
import inputStyles from "../../components/ui/Input/Input.module.css";
import styles from "./Main.module.css";

export function Main({ username }) {
  const { items, count, limit, page, loading, error, goToPage, create, update, remove } =
    usePosts();

  const [editPost, setEditPost] = useState(null);
  const [deletePost, setDeletePost] = useState(null);

  const sorted = useMemo(
    () => [...items].sort((a, b) => new Date(b.created_datetime) - new Date(a.created_datetime)),
    [items]
  );

  async function handleCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.toString().trim();
    const content = formData.get("content")?.toString().trim();

    if (!title || !content || !username) {
      return;
    }

    await create({ username, title, content });
    event.currentTarget.reset();
  }

  async function handleEditSave(event) {
    event.preventDefault();
    if (!editPost) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.toString().trim() || "";
    const content = formData.get("content")?.toString().trim() || "";

    if (!title || !content) {
      return;
    }

    await update(editPost.id, { title, content });
    setEditPost(null);
  }

  async function handleConfirmDelete() {
    if (!deletePost) {
      return;
    }

    await remove(deletePost.id);
    setDeletePost(null);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.topbar}>
        <h1 className={styles.topTitle}>CodeLeap Network</h1>
        <button
          className={styles.logoutBtn}
          onClick={() => {
            localStorage.removeItem("username");
            window.location.reload();
          }}
        >
          <span style={{ marginRight: 8 }}>
            <img src={exitIcon} className="exit-icon" alt="Logout icon" width="18.2" height="17" />
          </span>
          <span style={{ fontSize: 16 }}>Logout</span>
        </button>
      </div>
      <div className={styles.stack}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>What’s on your mind?</h2>
          <form key={items.length} className={styles.form} onSubmit={handleCreate}>
            <div>
              <label className={styles.label}>Title</label>
              <Input
                name="title"
                placeholder="Hello world"
                className={inputStyles.mainTitleInput}
              />
            </div>
            <div>
              <label className={styles.label}>Content</label>
              <Input
                as="textarea"
                name="content"
                placeholder="Content here"
                className={inputStyles.mainContentInput}
              />
            </div>
            <div className={styles.actions}>
              <Button variant="primary" width={120} type="submit" disabled={loading}>
                {loading ? "Posting…" : "Create"}
              </Button>
            </div>
          </form>
        </section>
        {error && <p className={styles.error}>{error}</p>}
        {sorted.length === 0 && !loading ? (
          <div className={styles.empty}>
            <p>No posts yet. Be the first to share! ✨</p>
          </div>
        ) : (
          sorted.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              currentUser={username}
              onEdit={() => setEditPost(p)}
              onDelete={() => setDeletePost(p)}
            />
          ))
        )}
        <Pagination page={page} total={count} limit={limit} onPage={goToPage} />
      </div>
      <Modal
        open={!!deletePost}
        onClose={() => setDeletePost(null)}
        title="Are you sure you want to delete this item?"
        border="strong"
        backdrop="grey"
        footer={
          <>
            <Button
              variant="ghost"
              width={120}
              onClick={() => setDeletePost(null)}
              style={{ background: "#FFF", color: "#000", border: "1px solid #999" }}
            >
              Cancel
            </Button>
            <Button variant="danger" width={120} onClick={handleConfirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <div className={styles.modalWidth} />
      </Modal>
      <Modal
        open={!!editPost}
        onClose={() => setEditPost(null)}
        title="Edit item"
        border="strong"
        backdrop="grey"
        footer={
          <>
            <Button
              variant="ghost"
              width={120}
              onClick={() => setEditPost(null)}
              style={{ background: "#FFF", color: "#000", border: "1px solid #999" }}
            >
              Cancel
            </Button>
            <Button variant="success" width={120} type="submit" form="edit-form">
              Save
            </Button>
          </>
        }
      >
        <div className={styles.modalWidth}>
          <form id="edit-form" onSubmit={handleEditSave}>
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1,
                  color: "#000000",
                  marginBottom: 8,
                }}
              >
                Title
              </label>
              <Input
                name="title"
                defaultValue={editPost?.title || ""}
                className={inputStyles.editTitleInput}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1,
                  color: "#000000",
                  marginBottom: 8,
                }}
              >
                Content
              </label>
              <Input
                as="textarea"
                name="content"
                defaultValue={editPost?.content || ""}
                className={inputStyles.editContentInput}
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
