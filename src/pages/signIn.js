import '../assets/scss/style.scss';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../api/apiRquests';
import { useDispatch } from 'react-redux';

import { setToken } from '../slices/authSlice';

function SignIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {body} = await getToken({email: emailRef.current.value, password: passwordRef.current.value})
            const token = body.token
            dispatch(setToken(token));
            localStorage.setItem("token",token)
            navigate('/account');
        }
        catch (error) {
           console.log(error)
        }
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
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
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                   <button className="sign-in-button">Sign In</button> 
                </form>
            </section>
        </main>
    );
}

export default SignIn;