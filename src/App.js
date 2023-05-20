import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FunctionalStates from "./context/FunctionalStates";
import Home from "./components/general/Home";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Account from "./components/user/Account";
import Launch from "./components/general/Launch";
import Adminlogin from "./components/admin/Adminlogin";
import Managerlogin from "./components/admin/Managerlogin";
import Admin from "./components/admin/Admin";

function App() {
  return (
    <>
      <FunctionalStates>
        <Router>
          <Routes>
            <Route exact path="/" element={<Launch />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/adminlogin" element={<Adminlogin />} />
            <Route exact path="/managerlogin" element={<Managerlogin />} />
            <Route exact path="/users" element={<Admin />} />
          </Routes>
        </Router>
      </FunctionalStates>
    </>
  );
}

export default App;
