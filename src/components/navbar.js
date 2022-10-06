import logo from '../assets/img/argentBankLogo.png';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="main-nav">
            <Link to={'/'}>
                <span className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </span>
            </Link>
            <div>
                <Link to={'/sign-in'}>
                    <span className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;