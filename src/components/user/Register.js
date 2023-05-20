import React, { useContext, useState } from "react";
import ContextApi from "../../context/contextApi";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../general/Alert";

const Register = () => {
  const state = useContext(ContextApi);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      let userName = credentials.firstname + " " + credentials.lastname;
      let userAge = parseInt(credentials.age);
      let userContact = parseInt(credentials.contact);
      const response = await state.userRegister(
        userName,
        userAge,
        credentials.gender,
        userContact,
        credentials.email,
        credentials.password
      );
      if (response.success) {
        navigate("/");
      } else {
        if (response.errors) {
          state.showAlert("danger", response.errors[0].msg);
        } else {
          state.showAlert("danger", response.error);
        }
        setCredentials({
          firstname: "",
          lastname: "",
          age: "",
          gender: "",
          contact: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    } else {
      state.showAlert("danger", "Passwords do not match");
      setCredentials({
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        contact: "",
        email: "",
        password: "",
        cpassword: "",
      });
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };
  return (
    <>
      <Alert />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "90vh",
          backgroundImage: `linear-gradient(${state.colors.light}, white)`,
        }}
      >
        <div
          className="container-login border border-1 border-warning"
          style={{
            backgroundColor: "white",
            fontFamily: state.fonts.font3,
          }}
        >
          <h3 className="mb-4" style={{ fontFamily: state.fonts.font2 }}>
            Register
          </h3>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="d-flex">
              <div className="mb-3 me-2 w-50">
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={credentials.firstname}
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 ms-2 w-50">
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={credentials.lastname}
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="input-group mb-3 me-2 w-50">
                <input
                  type="text"
                  id="age"
                  className="form-control"
                  placeholder="Age"
                  value={credentials.age}
                  aria-label="Age"
                  aria-describedby="years"
                  onChange={handleChange}
                  required
                />
                <span className="input-group-text" id="years">
                  years
                </span>
              </div>
              <div className="input-group mb-3 ms-2 w-50">
                <select
                  className="form-select"
                  id="gender"
                  onChange={handleChange}
                  required
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Rather not say">Rather not say</option>
                </select>
              </div>
            </div>
            <div className="d-flex">
              <div className="mb-3 me-2 w-50">
                <input
                  type="tel"
                  className="form-control"
                  id="contact"
                  value={credentials.contact}
                  placeholder="Phone Number"
                  onChange={handleChange}
                  minLength={10}
                />
              </div>
              <div className="mb-3 ms-2 w-50">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={credentials.email}
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="mb-3 me-2 w-50">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={credentials.password}
                  placeholder="Password"
                  onChange={handleChange}
                  minLength={8}
                  required
                />
              </div>
              <div className="mb-3 ms-2 w-50">
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  value={credentials.cpassword}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  minLength={8}
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-warning mt-2">
                Create Account
              </button>
            </div>
          </form>
        </div>
        <div
          className="text-center mt-2"
          style={{ fontFamily: state.fonts.font1 }}
        >
          Already an existing user?{" "}
          <Link className="text-decoration-none text-secondary" to="/">
            Login
          </Link>{" "}
          instead
        </div>
      </div>
    </>
  );
};

export default Register;
