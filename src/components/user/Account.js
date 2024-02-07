import React, { useRef, useContext, useState } from "react";
import ContextApi from "../../context/contextApi";
import UpdateUser from "../modals/UpdateUser";
import Navbar from "../general/Navbar";
import Alert from "../general/Alert";

const Account = () => {
  const state = useContext(ContextApi);
  const refOpenUpdate = useRef(null);
  const dateobj = state.currentUser.date;
  const [user, setUser] = useState({
    _id: "",
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
  });
  let date = {};
  if (dateobj) {
    let dateStr = dateobj.toString();
    date = {
      year: dateStr.substring(0, 4),
      month: dateStr.substring(5, 7),
      day: dateStr.substring(8, 10),
      hour: parseInt(dateStr.substring(11, 13)) + 5,
      minute: parseInt(dateStr.substring(14, 16)) + 30,
      second: dateStr.substring(17, 19),
      meridian: "am",
    };
  }
  if (date.hour && date.hour > 12) {
    date.hour = date.hour - 12;
    date.meridian = "pm";
  }
  if (date.minute && date.minute > 60) {
    date.minute = date.minute - 60;
    date.hour = date.hour + 1;
  }
  if (date.hour && date.hour < 10) {
    date.hour = "0" + date.hour;
  }
  if (date.minute && date.minute < 10) {
    date.minute = "0" + date.minute;
  }
  const updateUser = (currentuser) => {
    refOpenUpdate.current.handleClick();
    setUser(currentuser);
  };
  return (
    <>
      <UpdateUser user={user} setUser={setUser} ref={refOpenUpdate} />
      <Navbar path="/account" />
      <Alert />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `linear-gradient(${state.colors.light},${state.colors.dark})`,
          height: "81.7vh",
        }}
      >
        <div
          className="container-account container-login border border-1 border-warning"
          style={{
            backgroundColor: "white",
            fontFamily: state.fonts.font3,
          }}
        >
          <h3 style={{ fontFamily: state.fonts.font2 }}>Account Details</h3>
          <hr className="my-3 border-3 border-warning" />
          <div>
            <div className="mb-3 d-flex fs-5">
              <div
                className="fw-bold"
                style={{ fontFamily: state.fonts.font1 }}
              >
                Name&nbsp;:&nbsp;
              </div>
              <div style={{ fontFamily: state.fonts.font3 }}>
                {state.currentUser.name}
              </div>
            </div>
            <div className="mb-3 d-flex fs-5">
              <div
                className="fw-bold"
                style={{ fontFamily: state.fonts.font1 }}
              >
                Age&nbsp;:&nbsp;
              </div>
              <div style={{ fontFamily: state.fonts.font3 }}>
                {state.currentUser.age}
              </div>
            </div>
            <div className="mb-3 d-flex fs-5">
              <div
                className="fw-bold"
                style={{ fontFamily: state.fonts.font1 }}
              >
                Gender&nbsp;:&nbsp;
              </div>
              <div style={{ fontFamily: state.fonts.font3 }}>
                {state.currentUser.gender}
              </div>
            </div>
            <div className="mb-3 d-flex fs-5">
              <div
                className="fw-bold"
                style={{ fontFamily: state.fonts.font1 }}
              >
                Phone Number&nbsp;:&nbsp;
              </div>
              <div style={{ fontFamily: state.fonts.font3 }}>
                {state.currentUser.contact
                  ? state.currentUser.contact
                  : "Not provided"}
              </div>
            </div>
            <div className="mb-3 d-flex fs-5">
              <div
                className="fw-bold"
                style={{ fontFamily: state.fonts.font1 }}
              >
                Email&nbsp;:&nbsp;
              </div>
              <div style={{ fontFamily: state.fonts.font3 }}>
                {state.currentUser.email}
              </div>
            </div>
            <div className="mb-2 mt-4 d-flex fs-5">
              <div className="fs-6" style={{ fontFamily: state.fonts.font1 }}>
                User since {date.day}/{date.month}/{date.year}, {date.hour}:
                {date.minute}:{date.second} {date.meridian}.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn position-fixed bottom-0 newBlogBtn rounded-pill mb-3 me-3 p-3 fw-bold"
          onClick={() => {
            updateUser(state.currentUser);
          }}
          style={{ backgroundColor: "#fcce42" }}
        >
          <span className="p-2">Edit Profile</span>
          <i className="fa-solid fa-pen p-2"></i>
        </button>
      </div>
    </>
  );
};

export default Account;
