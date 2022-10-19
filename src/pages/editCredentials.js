import {Link, useNavigate} from "react-router-dom";
import { useRef } from 'react';
import { updateProfile } from '../api/apiRquests';
import {useDispatch} from 'react-redux';

import { setUser } from '../slices/userSlice';

function EditCredentials() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { body } = await updateProfile({ firstName: firstNameRef.current.value ,lastName: lastNameRef.current.value })
      dispatch(setUser(body));
      navigate('/profile');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="update-credentials">
      <h2>Modifier mes informations</h2>
      <section className="form-wrapper">
        <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="firstname">Prénom</label>
          <input ref={firstNameRef} type="text" id="firstname" required={true}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastname">Nom</label>
          <input ref={lastNameRef} type="text" id="lastname" required={true}/>
        </div>
        <button className="sign-in-button">Modifier</button>
      </form>
      </section>
      <Link to={'/profile'}>
          <button className="cancel">
            Annuler
          </button>
      </Link>
    </div>
  )
}

export default EditCredentials;