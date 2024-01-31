import React, { useContext } from "react";
import Navbar from "../general/Navbar";
import Alert from "../general/Alert";
import ContextApi from "../../context/contextApi";
import { useNavigate } from "react-router-dom";

const BlogItem = () => {
  const navigate = useNavigate();
  const state = useContext(ContextApi);
  const dateobj = state.oneBlog.date;
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
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="sticky-top">
        <Navbar path="/blogitem" />
        <Alert />
      </div>
      <div
        className="p-4"
        style={{
          backgroundImage: `linear-gradient(#fcd96d,${state.colors.light})`,
          minHeight: "82vh",
          fontFamily: state.fonts.font2,
        }}
      >
        <div
          onClick={() => {
            goBack();
          }}
        >
          <i className="fa-solid fa-xl fa-angles-left"></i>
        </div>
        <div className="px-5">
          <h2
            className="text-center fw-bold mb-4"
            // style={{ backgroundColor: "black" }}
          >
            {state.oneBlog.title}
          </h2>
          <p className="blog-item">{state.oneBlog.items}</p>
          <div className="d-flex justify-content-between">
            <h6 className="fw-bold">{state.oneBlog.ttr} Minutes read</h6>
            <h6 className="fw-bold">
              Published on {date.day}/{date.month}/{date.year}, {date.hour}:
              {date.minute}:{date.second} {date.meridian}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
