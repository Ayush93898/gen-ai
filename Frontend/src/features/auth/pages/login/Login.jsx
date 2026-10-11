import { Link, useNavigate } from "react-router";
import { useState } from "react";
import "./login.scss";

import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate()
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleLogin({ email, password });
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password.");
    }
  };

  if (loading) {
    return (
      <main className="login-page">
        <p className="login-loading">Loading...</p>
      </main>
    );
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <header className="login-header">
          <h1>Welcome back</h1>
          <p>Log in to continue to your account.</p>
        </header>

        <form onSubmit={handleSubmit} className="login-form" noValidate={false}>
          {error && (
            <div className="form-error" role="alert">
              <svg
                className="form-error__icon"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="8.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 5.75v5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="13.75" r="0.9" fill="currentColor" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              className={error ? "has-error" : ""}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot?
              </Link>
            </div>
            <input
              className={error ? "has-error" : ""}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Log in
          </button>
        </form>

        <p className="register-prompt">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </section>
    </main>
  );
}
