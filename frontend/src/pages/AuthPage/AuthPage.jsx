import { useState } from 'react';
import './AuthPage.css';
import logo from '../../assets/logo.png'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        user_handle: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLogin) {
            try {
                const response = await fetch("/api/auth/signup", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error("Backend rejected the request:", data.error);
                    toast.error(data.error);
                } else {
                    console.log("User registered successfully!", data);
                    toast.success("Account created! Please sign-in.")
                    setIsLogin(true);
                }

            } catch (error) {
                console.error("Network or server connection failed:", error);
                toast.error("Network error. Please try again.")
            }

        } else {
            try {

                const loginData = {
                    email: formData.email,
                    password: formData.password
                };

                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginData),
                })

                const data = await response.json();

                if (!response.ok) {
                    console.error("Login failed", data.error)
                    toast.error(data.error);
                } else {
                    console.log("Login subccesful", data);
                    toast.success("Welcome back!")

                    localStorage.setItem("dtube_token", data.token);

                    localStorage.setItem("dtube_user", JSON.stringify(data.user));

                    navigate("/");
                }

            } catch (error) {
                console.error("Network error during login: ", error);
                toast.error("Network error. Please try again.")
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <img src={logo} alt="DTube" className="auth-logo" />
                <h2 className="auth-title">{isLogin ? 'Sign in' : 'Create an account'}</h2>
                <p className="auth-subtitle">
                    {isLogin ? 'to continue to DTube' : 'Join the DTube community'}
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="auth-input"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="user_handle"
                            placeholder="Channel Handle (e.g., @MyChannel)"
                            className="auth-input"
                            value={formData.user_handle}
                            onChange={handleChange}
                            required
                        />
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="auth-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="auth-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="auth-submit-btn">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-toggle">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            className="auth-toggle-btn"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Create account' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}