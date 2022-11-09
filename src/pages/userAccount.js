import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from "../api/apiRquests";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../slices/userSlice";
import { logOut } from '../slices/authSlice';

function UserAccount() {
  const isConnected = useSelector((state) => state.token.token !== null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const { body } = await getProfile();
      dispatch(setUser(body));
    } catch (error) {
      console.log(error)
      dispatch(logOut())
      localStorage.removeItem("token");
      navigate('/');
    }
    setIsLoading(false);
  },[dispatch, navigate]) 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ firstName: firstNameRef.current.value, lastName: lastNameRef.current.value })
      const { body } = await getProfile();
      dispatch(setUser(body));
      setShowForm(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isConnected) fetchUser();
    else navigate('/');
  }, [isConnected, fetchUser, navigate]);

  const user = useSelector((state) => state.user)

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br/>{ user.firstName } !</h1>
          { showForm ?
            <form className="credentials-form" onSubmit={ handleSubmit }>
              <div className="section-wrapper">
                <div className="input-wrapper">
                  <label htmlFor="firstname">Prénom</label>
                  <input ref={ firstNameRef } type="text" id="firstname" required={ true }
                          defaultValue={ user.firstName }/>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="lastname">Nom</label>
                  <input ref={ lastNameRef } type="text" id="lastname" required={ true }
                          defaultValue={ user.lastName }/>
                </div>
              </div>
              <div className="section-wrapper">
                <button className="confirm form-button">Modifier</button>
                <button className="cancel form-button" onClick={ () => setShowForm(false) }>Annuler</button>
              </div>
            </form>
            : <button className="edit-button" onClick={ () => setShowForm(true) }>Edit Name</button> }

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
    </div>
  )
}

export default UserAccount;