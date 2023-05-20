import React, { useContext } from "react";
import ContextApi from "../../context/contextApi";
import Login from "../user/Login";
import Alert from "../general/Alert";

const Managerlogin = () => {
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
          <Login type="manager" />
        </div>
      </div>
    </>
  );
};

export default Managerlogin;
