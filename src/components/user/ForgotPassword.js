import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContextApi from "../../context/contextApi";
import Alert from "../general/Alert";

const Password = () => {
  const state = useContext(ContextApi);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await state.verifyUser(credentials.email);
    if (result.success) {
      await state.sendPassResetRequest(
        result.email,
        result.resetLink,
        result.name
      );
      navigate("/");
    } else {
      state.showAlert("danger", result.error);
    }
    setCredentials({ email: "" });
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

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
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "85vh", width: "60%" }}
        >
          <div
            className="container-login border border-1 border-warning"
            style={{
              backgroundColor: "white",
              fontFamily: state.fonts.font3,
            }}
          >
            <h3 className="mb-4" style={{ fontFamily: state.fonts.font2 }}>
              Find your account
            </h3>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email address"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-warning w-100 mt-3"
                  style={{ fontSize: "18px" }}
                >
                  Send Password Reset Link
                </button>
              </div>
            </form>
          </div>
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

export default Password;
