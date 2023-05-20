import React, {
  forwardRef,
  useContext,
  useRef,
  useImperativeHandle,
} from "react";
import ContextApi from "../../context/contextApi";

const UpdateNote = forwardRef((props, ref) => {
  const state = useContext(ContextApi);
  const refOpenUpdate = useRef(null);
  const refCloseUpdate = useRef(null);
  useImperativeHandle(ref, () => ({
    handleClick,
  }));
  const handleClick = () => {
    refOpenUpdate.current.click();
  };
  const handleChangeUpdate = (e) => {
    props.setNote({ ...props.note, [e.target.id]: e.target.value });
  };
  const handleClickUpdate = () => {
    state.updateNotes(
      props.note._id,
      props.note.title,
      props.note.items,
      props.note.tag,
      props.note.colourDark,
      props.note.colourLight
    );
    refCloseUpdate.current.click();
    state.viewNotes();
  };
  const changeSize = (e) => {
    if (e.target.offsetHeight < e.target.scrollHeight) {
      props.setRowNum(props.rowNum + 1);
    }
  };
  return (
    <div>
      <div>
        <button
          ref={refOpenUpdate}
          type="button"
          className="d-none btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#updateNotesModal"
        >
          Launch Update modal
        </button>

        <div
          className="modal fade"
          id="updateNotesModal"
          tabIndex="-1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
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
                  Edit Note
                </h1>
              </div>
              <div
                className="modal-body"
                style={{ backgroundColor: state.colors.light }}
              >
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Enter title of the note (optional)"
                      value={props.note.title}
                      onChange={handleChangeUpdate}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      className="form-control"
                      id="items"
                      onChange={(e) => {
                        changeSize(e);
                        handleChangeUpdate(e);
                      }}
                      rows={props.rowNum}
                      value={props.note.items}
                      placeholder="Enter contents of the note"
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="tag"
                      placeholder="Enter tag associated with the note (optional)"
                      value={props.note.tag}
                      onChange={handleChangeUpdate}
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
                  disabled={props.note.items.length < 5}
                  type="button"
                  className="btn btn-success"
                  onClick={handleClickUpdate}
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

export default UpdateNote;
