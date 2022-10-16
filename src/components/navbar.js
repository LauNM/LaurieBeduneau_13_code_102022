import logo from '../assets/img/argentBankLogo.png';
import { Link } from "react-router-dom";
import { logOut } from '../slices/authSlice';
import {useDispatch} from "react-redux";

function Navbar({isConnected}) {
  const dispatch = useDispatch();
  const out = () => {
    dispatch(logOut())
  }

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
              {isConnected ?
              <button className="logout-button" onClick={out}>
                <span className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    Sign Out
                </span>
              </button> :
                <Link to={'/sign-in'}>
                    <span className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </span>
                </Link>
              }
            </div>
        </nav>
    )
}

export default Navbar;