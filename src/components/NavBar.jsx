import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <Link to="/">Movies</Link>
                </div>

                <div className="navbar-right">
                    <div className="navbar-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/favorites" className="nav-link">Favorites</Link>
                    </div>

                    <div className="auth-area">
                        {isAuthenticated ? (
                            <>
                                <span className="user-name">{user.name}</span>
                                <button className="btn-logout" onClick={logout}>Logout</button>
                            </>
                        ) : (
                            <Link to="/login" className="nav-link btn-login">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;