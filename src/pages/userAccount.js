import React, {useEffect} from "react";
import {Link, Navigate} from 'react-router-dom';
import { getProfile } from "../api/apiRquests";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../slices/userSlice";

function UserAccount() {
    const { token } = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const fetchUser = async () => {
        try {
            const { body } = await getProfile();
            dispatch(setUser(body));
        }
        catch (error) {
            console.log(error)
        }
    }
   
    useEffect(() => {
        fetchUser();
    },[]);


    const user = useSelector((state) => state.user)

    if (token && user.firstName === null) return <div>Loading...</div>

    return (
        <div>
             {token ?
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{user.firstName} !</h1>
                    <Link to={'/profile/edit'}>
                        <button className="edit-button">Edit Name</button>
                    </Link>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
            : <Navigate to="/" />
            }
        </div>
    )
}

export default UserAccount;