import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ContextApi from "../../context/contextApi";
import Login from "../user/Login";
import Alert from "../general/Alert";

const Adminlogin = () => {
  const state = useContext(ContextApi);
  return (
    <>
      <Alert />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `linear-gradient(${state.colors.light}, white)`,
        }}
      >
        <div
          className="text-center"
          style={{
            width: "60%",
          }}
        >
          <Login type="admin" />
        </div>
      </div>
      <Link
        className="float-end mt-3 me-4 fw-bold text-decoration-none text-dark"
        style={{ fontSize: "14px", fontFamily: state.fonts.font1 }}
        to="/"
      >
        Back to home
      </Link>
    </>
  );
};

export default Adminlogin;
