import React, { useContext, useState } from "react";
import ContextApi from "../../context/contextApi";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  const state = useContext(ContextApi);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await state.userLogin(
      props.type,
      credentials.email,
      credentials.password
    );
    if (response.success) {
      localStorage.setItem("token", response.authToken);
      localStorage.setItem("userEmail", credentials.email);
      navigate("/home");
      state.viewNotes();
    } else {
      if (response.errors) {
        state.showAlert("danger", response.errors[0].msg);
      } else {
        state.showAlert("danger", response.error);
      }
      setCredentials({ email: "", password: "" });
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "85vh" }}
      >
        <div
          className="container-login border border-1 border-warning"
          style={{
            backgroundColor: "white",
            fontFamily: state.fonts.font3,
          }}
        >
          <h3 className="mb-4" style={{ fontFamily: state.fonts.font2 }}>
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)} Login
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
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={credentials.password}
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
                Log in
              </button>
              {props.type === "user" ? (
                <div>
                  <div className="mt-1 mb-2">
                    <Link
                      className="text-decoration-none text-dark"
                      style={{ fontSize: "12px" }}
                      to="/forgotPassword"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <hr className="note-divider" />
                  <div className="text-center mt-3">
                    <Link
                      className="text-decoration-none text-dark text-secondary btn btn-warning"
                      style={{ fontSize: "18px" }}
                      to="/register"
                    >
                      Create new account
                    </Link>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
