import '../assets/scss/style.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/fetchData';
import { useDispatch } from 'react-redux';

import { setToken } from '../slices/authSlice';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {body} = await getUser('http://localhost:3001/api/v1/user/login', {email, password})
            const token = body.token
            console.log(token)
            dispatch(setToken(token)); 
            setEmail('');
            setPassword('');
            navigate('/account');
        }
        catch (error) {
           console.log(error)
        }
    }

    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
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
                   <button className="sign-in-button">Sign In</button> 
                </form>
            </section>
        </main>
    );
}

export default SignIn;