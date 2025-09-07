import { useState } from "react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import styles from "./Signup.module.css";

export function Signup({ open = true, onSave }) {
  const [value, setValue] = useState("");

  return (
    <Modal
      open={open}
      onClose={() => {}}
      title="Welcome to CodeLeap network!"
      border="soft"
      backdrop="dim"
      footer={
        <Button
          variant="primary"
          width={111}
          disabled={!value.trim()}
          onClick={() => onSave(value.trim())}
          style={{ textTransform: "uppercase", fontWeight: 700, fontSize: 16, lineHeight: 1 }}
        >
          Enter
        </Button>
      }
    >
      <div className={styles.modalContent}>
        <label
          style={{
            display: "block",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1,
            color: "#000",
            marginBottom: 8,
          }}
        >
          Please enter your username
        </label>
        <Input
          placeholder="John doe"
          className={styles.signupInput}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </Modal>
  );
}
