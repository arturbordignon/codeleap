import { useEffect, useState } from "react";
const KEY = "username";

export function useUsername() {
  const [username, setUsername] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem(KEY));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (username) {
      localStorage.setItem(KEY, username);
    } else {
      localStorage.removeItem(KEY);
    }
  }, [username, ready]);

  return [username, setUsername, ready];
}
