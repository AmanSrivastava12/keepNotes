import React, {
  forwardRef,
  useContext,
  useRef,
  useImperativeHandle,
} from "react";
import ContextApi from "../../context/contextApi";

const DeleteUser = forwardRef((props, ref) => {
  const state = useContext(ContextApi);
  const refOpenDelete = useRef(null);
  const refCloseDelete = useRef(null);
  useImperativeHandle(ref, () => ({
    handleClick,
  }));
  const handleClick = () => {
    refOpenDelete.current.click();
  };
  const handleDeleteClick = () => {
    refCloseDelete.current.click();
    props.deleteUserOnClick();
  };
  return (
    <div>
      <div>
        <button
          ref={refOpenDelete}
          type="button"
          className="d-none btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
        >
          Launch Delete modal
        </button>
        <div
          className="modal fade"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          id="deleteModal"
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
                  Delete User
                </h1>
              </div>
              <div
                className="modal-body"
                style={{ backgroundColor: state.colors.light }}
              >
                <div className="mb-3">
                  <div className="px-2 pb-1">
                    Are you sure you want to delete this user?
                  </div>
                  <div className="px-2 pb-1">
                    The user with all the saved notes will be deleted.
                  </div>
                  <div className="px-2 pb-1">This action can't be undone.</div>
                </div>
                <form autoComplete="off">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="deleteUser"
                      placeholder="Enter email of the user to delete the user"
                      value={props.delVal}
                      onChange={(e) => props.setDelVal(e.target.value)}
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
                  ref={refCloseDelete}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DeleteUser;
