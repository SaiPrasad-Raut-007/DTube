import { useState } from 'react';
import './AuthPage.css';
import logo from '../../assets/logo.png'; 

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isLogin ? "Logging in..." : "Registering...", formData);
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
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="auth-input"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
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