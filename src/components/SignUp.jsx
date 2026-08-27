import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);

        axios
            .post('https://william123.alwaysdata.net/api/signup', formData)
            .then((response) => {
                setMessage(response.data.message || 'Registration successful!');
                setTimeout(() => navigate('/signin'), 1500);
            })
            .catch((error) => {
                console.log(error);
                setMessage('Registration failed. Try again.');
            });
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-5 card bg-dark text-light border-warning shadow p-4">
                    <h2 className="text-center text-warning fw-bold mb-4">Sign Up</h2>
                    
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
                            <label className="form-label text-warning">Email</label>
                            <input
                                type="email"
                                className="form-control bg-dark text-light border-warning"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                        <div className="mb-3">
                            <label className="form-label text-warning">Phone Number</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-light border-warning"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-warning fw-bold text-dark w-100 mt-3">
                            Register
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <span className="text-secondary">Already have an account? </span>
                        <Link to="/signin" className="text-warning text-decoration-none fw-bold">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;