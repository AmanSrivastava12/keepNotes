import React, {
  forwardRef,
  useContext,
  useRef,
  useImperativeHandle,
} from "react";
import ContextApi from "../../context/contextApi";

const UpdateUser = forwardRef((props, ref) => {
  const state = useContext(ContextApi);
  const refOpenUpdate = useRef(null);
  const refCloseUpdate = useRef(null);
  useImperativeHandle(ref, () => ({
    handleClick,
  }));
  const handleClick = () => {
    refOpenUpdate.current.click();
  };
  const handleChange = (e) => {
    props.setUser({ ...props.user, [e.target.id]: e.target.value });
  };
  const handleUpdateClick = () => {
    state.updateUsers(
      props.user._id,
      props.user.name,
      props.user.age,
      props.user.gender,
      props.user.contact,
      props.user.email
    );
    refCloseUpdate.current.click();
    state.viewUsers();
  };
  return (
    <div>
      <div>
        <button
          ref={refOpenUpdate}
          type="button"
          className="d-none btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#updateModal"
        >
          Launch Update modal
        </button>
        <div
          className="modal fade"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          id="updateModal"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div
                className="modal-header d-flex justify-content-center align-items-center"
                style={{ backgroundColor: state.colors.dark }}
              >
                <h1
                  className="modal-title fs-5"
                  id="staticBackdropLabel"
                  style={{ fontFamily: state.fonts.font2 }}
                >
                  Edit User
                </h1>
              </div>
              <div
                className="modal-body"
                style={{ backgroundColor: state.colors.light }}
              >
                <form autoComplete="off">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                      value={props.user.name || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        placeholder="Enter Age"
                        value={props.user.age || ""}
                        onChange={handleChange}
                        required
                      />
                      <select
                        className="form-select"
                        id="gender"
                        onChange={handleChange}
                        selected={props.user.gender || ""}
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Rather not say">Rather not say</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      placeholder="Enter Phone Number"
                      value={props.user.contact || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter User Email"
                      value={props.user.email || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </form>
              </div>
              <div
                className="modal-footer"
                style={{ backgroundColor: state.colors.dark }}
              >
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  ref={refCloseUpdate}
                >
                  Close
                </button>
                <button
                  disabled={
                    props.user.email.length === 0 ||
                    props.user.name.length === 0 ||
                    props.user.gender.length === 0
                  }
                  type="button"
                  className="btn btn-success"
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default UpdateUser;
