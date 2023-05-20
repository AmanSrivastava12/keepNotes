import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ContextApi from "../../context/contextApi";

export default function Navbar(props) {
  const state = useContext(ContextApi);
  let email = localStorage.getItem("userEmail");
  return (
    <>
      <nav
        className="navbar sticky-top navbar-expand-lg py-3"
        style={{
          backgroundImage: `linear-gradient(${state.colors.dark} ,#fcce42)`,
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand mx-3"
            to="/home"
            style={{ fontFamily: state.fonts.font1, fontWeight: "bold" }}
            onClick={() => {
              state.viewNotes();
            }}
          >
            KeepNotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ fontFamily: state.fonts.font2 }}
            >
              {/* <form className="d-flex mx-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  style={{ fontFamily: state.fonts.font2 }}
                >
                  Search
                </button>
              </form> */}
            </div>
            <div className="btn-group dropstart ps-4">
              <button
                className="btn btn-warning"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-angles-left"></i>
              </button>
              {props.path !== "/account" ? (
                <ul className="dropdown-menu p-0">
                  <li className="text-center py-1">
                    {" "}
                    <Link
                      className="text-decoration-none text-dark"
                      role="button"
                      style={{ fontFamily: state.fonts.font1 }}
                      to="/account"
                      onClick={() => {
                        state.userAccount();
                      }}
                    >
                      My Account
                    </Link>
                  </li>
                  <hr className="dropdown-divider m-0 border-black" />
                  <li className="text-center py-1">
                    {" "}
                    <Link
                      className="text-decoration-none text-dark"
                      role="button"
                      style={{ fontFamily: state.fonts.font1 }}
                      onClick={() => {
                        localStorage.clear();
                      }}
                      to="/"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="dropdown-menu p-0">
                  <li className="text-center py-1">
                    {" "}
                    <Link
                      className="text-decoration-none text-dark"
                      role="button"
                      style={{ fontFamily: state.fonts.font1 }}
                      onClick={() => {
                        state.viewNotes();
                      }}
                      to="/home"
                    >
                      Back to home
                    </Link>
                  </li>
                  <hr className="dropdown-divider m-0 border-black" />
                  <li className="text-center py-1">
                    {" "}
                    <Link
                      className="text-decoration-none text-dark"
                      role="button"
                      style={{ fontFamily: state.fonts.font1 }}
                      onClick={() => {
                        localStorage.clear();
                      }}
                      to="/"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="ms-4 me-2" style={{ width: "30px" }}>
              {(email === "admin@gmail.com" || email === "manager@gmail.com") &&
              props.path !== "/user" ? (
                <Link
                  className="text-decoration-none text-dark"
                  role="button"
                  style={{ fontFamily: state.fonts.font1 }}
                  to="/users"
                  onClick={() => {
                    state.viewUsers();
                  }}
                >
                  <i className="fa-solid fa-users"></i>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
