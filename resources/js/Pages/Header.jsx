import React from 'react';
import { Link } from '@inertiajs/react';

function Header({ user, onLogout }) {
    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">AutoMarket</h1>
                <nav className="nav">
                    <Link href="/">Home</Link>
                    <Link href="/listings">Listings</Link>
                    {/* Check user role */}
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link href="/admin" className="btn btn-admin">Admin Panel</Link>
                            )}
                            <button onClick={onLogout} className="btn btn-logout">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="btn btn-login">Login</Link>
                            <Link href="/register" className="btn btn-register">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
