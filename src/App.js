import Navbar from './components/navbar';
import Footer from './components/footer';
import { Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage';
import SignIn from './pages/sign-in';
import UserAccount from './pages/userAccount';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/account" element={<UserAccount />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
