import Navbar from './components/navbar';
import Footer from './components/footer';
import { Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage';
import Login from './pages/login';
import UserAccount from './pages/userAccount';
import Error from './pages/error';
import { useDispatch } from "react-redux";
import { setToken } from './slices/authSlice';

function App() {
  const dispatch = useDispatch()
  if (localStorage.getItem("token") !== null) {
    dispatch(setToken(localStorage.getItem("token")))
  }

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={ <Homepage/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/profile" element={ <UserAccount/> }/>
        <Route path="*" element={ <Error /> } />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
