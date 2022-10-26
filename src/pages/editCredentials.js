import {Link, useNavigate} from "react-router-dom";
import { useRef, useEffect } from 'react';
import {getProfile, updateProfile} from '../api/apiRquests';
import {useDispatch, useSelector} from 'react-redux';

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

  return (
    <div className="update-credentials">
      <h2>Modifier mes informations</h2>
      <section className="form-wrapper">
        <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="firstname">Prénom</label>
          <input ref={firstNameRef} type="text" id="firstname" required={true} defaultValue={user.firstName}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastname">Nom</label>
          <input ref={lastNameRef} type="text" id="lastname" required={true} defaultValue={user.lastName}/>
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