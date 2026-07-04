import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import "./ForgetPassword.css";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          data.message || "If an account exists, a reset link has been sent.",
        );
        setEmail("");
      } else {
        toast.error(data.error || "Failed to process request.");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error("A server error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="DTube" className="auth-logo" />

        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtitle">
          Enter your email to receive a reset link.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Please enter your email..."
            className="auth-input"
            value={email}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            Remember your password?{" "}
            <Link to="/auth" className="auth-toggle-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
