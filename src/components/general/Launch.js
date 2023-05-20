import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ContextApi from "../../context/contextApi";
import Login from "../user/Login";
import Alert from "./Alert";

const Launch = () => {
  const state = useContext(ContextApi);
  return (
    <>
      <Alert />
      <div
        className="py-3 d-flex"
        style={{
          fontFamily: state.fonts.font3,
          fontSize: "18px",
          height: "90vh",
          backgroundImage: `linear-gradient(${state.colors.light}, white)`,
        }}
      >
        <div
          className="w-50"
          style={{ paddingTop: "100px", paddingLeft: "100px" }}
        >
          <h1
            className="fw-bold text-warning"
            style={{ fontFamily: state.fonts.font1, fontSize: "50px" }}
          >
            KeepNotes
          </h1>
          <p className="mt-2">
            You learn actively when you take notes and you’re processing
            information. You’re highlighting facts, connecting the dots, and
            breaking down a big topic into small chunks. There is a lesser
            chance of missing out on crucial information when you jot it down.
            Remembering seems less overwhelming!
          </p>
        </div>
        <div className="w-50">
          <Login type="user" />
          <div className="float-end fw-bold" style={{ fontSize: "14px" }}>
            <Link
              className="text-decoration-none text-dark me-3"
              to="/adminlogin"
            >
              Admin Login
            </Link>
            <Link
              className="text-decoration-none text-dark me-4"
              to="/managerlogin"
            >
              Manager Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Launch;
