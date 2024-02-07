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
              <div className="d-flex mx-3">
                <div
                  className="text-center py-1 mx-3"
                  style={{ width: "20px" }}
                >
                  {" "}
                  <Link
                    className="text-decoration-none text-dark"
                    role="button"
                    style={{ fontFamily: state.fonts.font1 }}
                    to="/note"
                    onClick={() => {
                      state.viewNotes();
                    }}
                  >
                    <i
                      title="Make Notes"
                      className="fa-regular fa-note-sticky"
                    ></i>
                  </Link>
                </div>
                <div
                  className="text-center py-1 mx-3"
                  style={{ width: "20px" }}
                >
                  {" "}
                  <Link
                    className="text-decoration-none text-dark"
                    role="button"
                    style={{ fontFamily: state.fonts.font1 }}
                    to="/blog"
                    onClick={() => {
                      state.viewBlogs();
                    }}
                  >
                    <i
                      title="Write Blogs"
                      className="fa-regular fa-file-lines"
                    ></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-flex">
              {email === process.env.REACT_APP_ADMIN_EMAIL ||
              email === process.env.REACT_APP_MANAGER_EMAIL ? (
                <div
                  className="text-center py-1 mx-3"
                  style={{ width: "20px" }}
                >
                  <Link
                    className="text-decoration-none text-dark"
                    role="button"
                    style={{ fontFamily: state.fonts.font1 }}
                    to="/users"
                    onClick={() => {
                      state.viewUsers();
                    }}
                  >
                    <i title="Edit Users" className="fa-solid fa-users"></i>
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
              <div className="text-center py-1 mx-3" style={{ width: "20px" }}>
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
                  <i title="My Profile" className="fa-solid fa-user"></i>
                </Link>
              </div>
              <div className="text-center py-1 mx-3" style={{ width: "20px" }}>
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
                  <i
                    title="Logout"
                    className="fa-solid fa-arrow-right-from-bracket"
                  ></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
