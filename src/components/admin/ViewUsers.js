import React from "react";

const ViewOther = (props) => {
  let email = localStorage.getItem("userEmail");
  const dateobj = props.user.date;
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

  return (
    <>
      <div className="p-3 mb-1 rounded-3" style={{ backgroundColor: "white" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h5>{props.user.name}</h5>
          <div>
            {props.user.age}, {props.user.gender}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>{props.user.email}</div>
          <div>{props.user.contact || "Not provided"}</div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            User since {date.day}/{date.month}/{date.year}, {date.hour}:
            {date.minute}:{date.second} {date.meridian}.
          </div>
          {email === process.env.REACT_APP_ADMIN_EMAIL ? (
            <div>
              <i
                title="Delete user"
                className="fa-regular fa-trash-can"
                onClick={() => {
                  props.handleClickDelete(props.user);
                }}
              ></i>
              <i
                title="Edit user"
                className="fa-sharp fa-regular fa-pen-to-square ms-3"
                onClick={() => props.updateUser(props.user)}
              ></i>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewOther;
