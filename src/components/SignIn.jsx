import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        axios
            .post('https://william123.alwaysdata.net/api/signin', formData)
            .then((response) => {
                setMessage(response.data.message);
                const userData = response.data.user || { username: username };
                localStorage.setItem('user', JSON.stringify(userData));
                
                if (onLoginSuccess) {
                    onLoginSuccess(userData);
                }
                
                setTimeout(() => navigate('/'), 1000);
            })
            .catch((error) => {
                console.log(error);
                setMessage('Login failed. Check your credentials.');
            });
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-5 card bg-dark text-light border-warning shadow p-4">
                    <h2 className="text-center text-warning fw-bold mb-4">Sign In</h2>
                    
                    {message && (
                        <div className={`alert ${message.toLowerCase().includes('fail') ? 'alert-danger' : 'alert-success'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-warning">Username</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-light border-warning"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-warning">Password</label>
                            <input
                                type="password"
                                className="form-control bg-dark text-light border-warning"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-warning fw-bold text-dark w-100 mt-3">
                            Login
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <span className="text-secondary">Don't have an account? </span>
                        <Link to="/signup" className="text-warning text-decoration-none fw-bold">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;