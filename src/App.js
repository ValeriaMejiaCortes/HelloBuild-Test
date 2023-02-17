import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Login/SingUp";
import Login from "./Login/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Favorities from "./components/Favorities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorities" element={<Favorities />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
