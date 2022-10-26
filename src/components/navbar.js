import logo from '../assets/img/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from '../slices/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../api/apiRquests";
import { setUser } from "../slices/userSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const { body } = await getProfile();
      dispatch(setUser(body));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isConnected) fetchUser();
  }, []);

  const user = useSelector((state) => state.user)

  const logout = () => {
    try {
      dispatch(logOut())
      localStorage.removeItem("token");
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }
  const isConnected = useSelector((state) => state.token.token);

  return (
    <nav className="main-nav">
      <Link to={ '/' }>
        <span className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={ logo }
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </span>
      </Link>
      <div>
        { isConnected ?
          <span>
            <Link to={ '/profile' }>
              <span className="main-nav-item">
                <FontAwesomeIcon icon={ faUserCircle }/>
                {user.firstName}
              </span>
            </Link>
            <button className="logout-button" onClick={ logout }>
              <span className="main-nav-item">
                <FontAwesomeIcon icon={ faArrowRightFromBracket }/>
                Sign Out
              </span>
            </button>
          </span>
          :
          <Link to={ '/login' }>
            <span className="main-nav-item">
              <FontAwesomeIcon icon={ faUserCircle }/>
              Sign In
            </span>
          </Link>
        }
      </div>
    </nav>
  )
}

export default Navbar;