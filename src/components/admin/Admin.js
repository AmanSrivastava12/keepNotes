import React, { useContext, useRef, useState } from "react";
import ContextApi from "../../context/contextApi";
import ViewUsers from "./ViewUsers";
import UpdateUser from "../modals/UpdateUser";
import Navbar from "../general/Navbar";
import Alert from "../general/Alert";

const Admin = () => {
  const state = useContext(ContextApi);
  const refOpenUpdate = useRef(null);
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
  const handleClickDelete = (currentUser) => {
    let userEmail = prompt(
      "Please enter the email of the user to delete it",
      ""
    );
    if (userEmail === currentUser.email) {
      state.deleteUsers(currentUser._id);
      state.viewUsers();
    }
    setUser(currentUser);
  };

  return (
    <>
      <UpdateUser user={user} setUser={setUser} ref={refOpenUpdate} />
      <div className="sticky-top">
        <Navbar path="/user" />
        <Alert />
      </div>
      <div
        className="pt-3 pb-5"
        style={{
          minHeight: "81.7vh",
          backgroundImage: `linear-gradient(${state.colors.light},${state.colors.dark})`,
        }}
      >
        <div
          className="container container-fluid container-account bg-warning container-login border border-1 border-warning"
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
                <ViewUsers
                  user={user}
                  key={user._id}
                  updateUser={updateUser}
                  handleClickDelete={handleClickDelete}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
