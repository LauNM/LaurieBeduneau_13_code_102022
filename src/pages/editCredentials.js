import '../assets/scss/style.scss';
import {Link} from "react-router-dom";

function EditCredentials() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /*const { body } = await getToken('http://localhost:3001/api/v1/user/login', { email, password })
      const token = body.token
      dispatch(setToken(token));*/

    } catch (error) {
      console.log(error)
    }
  }

 /* const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);*/

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Prénom</label>
          <input type="text" id="username" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Nom</label
          ><input type="password" id="password" />
        </div>
        <button className="sign-in-button">Modifier</button>
      </form>
      <Link to={'/account'}>
          <span className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Retour au compte
          </span>
      </Link>

    </div>
  )
}

export default EditCredentials;