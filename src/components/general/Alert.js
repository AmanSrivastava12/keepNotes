import React, { useContext } from "react";
import ContextApi from "../../context/contextApi";

const Alert = (props) => {
  const state = useContext(ContextApi);
  return (
    <>
      <div
        className="d-flex"
        style={{
          height: "36px",
          width: "100vw",
          backgroundColor: state.colors.light,
        }}
      >
        {state.alert && (
          <div className={`alerts bg-${state.alert.type}`}>
            {state.alert.message}
          </div>
        )}
      </div>
    </>
  );
};

export default Alert;
