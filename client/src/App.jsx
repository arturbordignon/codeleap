import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { PostsProvider } from "./store/postsStore";
import { useUsername } from "./hooks/useUsername";
import { Main } from "./pages/Main";
import { Signup } from "./pages/Signup";
import "./index.css";

function RequireUsername({ username, children }) {
  const loc = useLocation();

  if (!username) {
    return <Navigate to="/signup" replace state={{ from: loc }} />;
  }

  return children;
}

function RedirectIfSignedIn({ username, children }) {
  if (username) return <Navigate to="/" replace />;
  return children;
}

export function App() {
  const [username, setUsername, ready] = useUsername();
  const navigate = useNavigate();

  useEffect(() => {}, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <section className="container">
      <PostsProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireUsername username={username}>
                <Main username={username} />
              </RequireUsername>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfSignedIn username={username}>
                <Signup
                  onSave={(name) => {
                    setUsername(name);
                    navigate("/");
                  }}
                />
              </RedirectIfSignedIn>
            }
          />
          <Route path="*" element={<Navigate to={username ? "/" : "/signup"} replace />} />
        </Routes>
      </PostsProvider>
    </section>
  );
}
