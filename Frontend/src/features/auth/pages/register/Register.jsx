import { useNavigate, Link } from "react-router";
import { useState } from "react";
import "./register.scss";

import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const clearError = () => {
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleRegister({ username, email, password });
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <main className="register-page">
        <p className="register-loading">Loading...</p>
      </main>
    );
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <header className="register-header">
          <h1>Create an account</h1>
          <p>Get started with your new account.</p>
        </header>

        <form onSubmit={handleSubmit} className="register-form">
          {error && (
            <div className="form-error" role="alert">
              <svg
                className="form-error__icon"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 5.75v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="13.75" r="0.9" fill="currentColor" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearError();
              }}
              id="username"
              name="username"
              type="text"
              placeholder="johndoe"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
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
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="register-button">
            Create account
          </button>
        </form>

        <p className="login-prompt">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}