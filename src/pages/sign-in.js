import '../assets/scss/style.scss';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useLoginMutation } from '../slices/authApiSlice';

function SignIn() {
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

  /*   useEffect(() => {
        useRef.current.focus();
    }, []) */

    useEffect(() => {
        setErrorMessage('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ email, password }).unwrap();
            dispatch(setCredentials({...userData, email }));
            setEmail('');
            setPassword('');
            navigate('/account');
        }
        catch (error) {
            if (!error?.originalStatus) {
                setErrorMessage('No Server Response');
            } else if (error.originalStatus?.status === 400) {
                setErrorMessage('Missing username or password');
            } else if (error.originalStatus?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
            // useRef.current.focus();
        }
    }

    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);

    return (
        <main className="main bg-dark">
            {isLoading ? <h1>Loading...</h1> : 
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                {/* <p ref={errorMessage}></p> */}
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={handleEmailInput}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label
                        ><input type="password" id="password" onChange={handlePasswordInput}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
                    {/* <a href="./user.html" className="sign-in-button">Sign In</a> */}
                    {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
                   <button className="sign-in-button">Sign In</button> 
                    {/* <!--  --> */}
                </form>
            </section>
        }
        </main>
    );
}

export default SignIn;