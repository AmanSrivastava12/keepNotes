import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ContextApi from "../../context/contextApi";
import Alert from "../general/Alert";

const Verification = () => {
  const state = useContext(ContextApi);
  const location = useLocation();
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const handleChangePass = (e) => {
    setPass(e.target.value);
  };
  const handleChangeCpass = (e) => {
    setCpass(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass === cpass) {
      const pathURL = location.search;
      const arrURL = pathURL.split("&");
      const id = arrURL[1].substring(3);
      let result = await state.updateUserPassword(id, pass);
      if (result.success) {
        state.showAlert("success", "Password changed successfully");
        navigate("/");
      } else {
        state.showAlert(
          "danger",
          `${result.error || result.errors[0].msg}. Please try again`
        );
      }
      setPass("");
      setCpass("");
    } else {
      state.showAlert("danger", "Passwords do not match");
    }
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
              Reset your password
            </h3>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  placeholder="Enter new password"
                  value={pass}
                  onChange={handleChangePass}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="cpass"
                  placeholder="Confirm new password"
                  value={cpass}
                  onChange={handleChangeCpass}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-warning w-100 mt-3"
                  style={{ fontSize: "18px" }}
                >
                  Reset Password
                </button>
                <div className="mt-2">
                  <Link
                    className="text-decoration-none text-dark"
                    style={{ fontSize: "14px" }}
                    //   to="/forgotPassword"
                  >
                    Send Password Reset Link in <span></span>
                  </Link>
                </div>
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

export default Verification;
