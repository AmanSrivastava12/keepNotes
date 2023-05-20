import React, { useContext, useEffect, useRef, useState } from "react";
import ContextApi from "../../context/contextApi";
import { useNavigate } from "react-router-dom";
import ViewUsers from "./ViewUsers";
import UpdateUser from "../modals/UpdateUser";
import Navbar from "../general/Navbar";
import Alert from "../general/Alert";

const Admin = () => {
  const state = useContext(ContextApi);
  const refOpenUpdate = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      state.viewUsers();
    } else {
      navigate("/home");
    }
  });
  const [user, setUser] = useState({
    _id: "",
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
  });
  const updateUser = (currentUser) => {
    refOpenUpdate.current.handleClick();
    setUser(currentUser);
  };

  return (
    <>
      <UpdateUser user={user} setUser={setUser} ref={refOpenUpdate} />
      <Navbar path="/user" />
      <Alert />
      <div
        className="pt-3 pb-5"
        style={{ minHeight: "82.2vh", backgroundColor: state.colors.light }}
      >
        <div
          className="container container-fluid container-account bg-warning"
          style={{
            fontFamily: state.fonts.font3,
          }}
        >
          <h2 className="mb-3" style={{ fontFamily: state.fonts.font2 }}>
            Existing Users
          </h2>
          <div className="row mx-1">
            <div className="mx-1" style={{ fontFamily: state.fonts.font2 }}>
              {state.users.length === 0 && "No users available."}
            </div>
            {state.users.map((user) => {
              return (
                <ViewUsers user={user} key={user._id} updateUser={updateUser} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
