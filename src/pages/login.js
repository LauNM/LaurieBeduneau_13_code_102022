import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../api/apiRquests';
import { useDispatch } from 'react-redux';

import { setToken } from '../slices/authSlice';
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const checkRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {body} = await getToken({email: emailRef.current.value, password: passwordRef.current.value})
            const token = body.token
            dispatch(setToken(token));
            if (checkRef.current.checked) {
                localStorage.setItem("token",token)
            }
            navigate('/profile');
        }
        catch (error) {
           console.log(error)
        }
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon"/>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input ref={emailRef} type="text" id="username"/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input ref={passwordRef} type="password" id="password"/>
                    </div>
                    <div className="input-remember">
                        <input ref={checkRef} type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                   <button className="sign-in-button">Sign In</button> 
                </form>
            </section>
        </main>
    );
}

export default Login;