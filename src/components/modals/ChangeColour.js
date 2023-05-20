import React, {
  forwardRef,
  useContext,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import ContextApi from "../../context/contextApi";

const ChangeColour = forwardRef((props, ref) => {
  const state = useContext(ContextApi);
  const refOpenColour = useRef(null);
  const refCloseColour = useRef(null);
  const [disableVal, setDisableVal] = useState(false);
  useImperativeHandle(ref, () => ({
    handleClick,
  }));
  const handleClick = () => {
    refOpenColour.current.click();
  };
  const handleChangeColour = (e) => {
    props.setNote({
      ...props.note,
      colourDark: e.target.id,
      colourLight: e.target.value,
    });
    setDisableVal(true);
  };
  const handleClickColour = () => {
    state.updateNotes(
      props.note._id,
      props.note.title,
      props.note.items,
      props.note.tag,
      props.note.colourDark,
      props.note.colourLight
    );
    refCloseColour.current.click();
    state.viewNotes();
    setTimeout(() => {
      setDisableVal(false);
    }, 200);
  };

  return (
    <div>
      <div>
        <button
          ref={refOpenColour}
          type="button"
          className="d-none btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#changeColourModal"
        >
          Launch Change Colour modal
        </button>
        <div
          className="modal fade"
          id="changeColourModal"
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
                <h5
                  className="modal-title mt-1"
                  id="staticBackdropLabel"
                  style={{ fontFamily: state.fonts.font2 }}
                >
                  Choose a colour for the selected node
                </h5>
              </div>
              <div
                className="modal-body"
                style={{ backgroundColor: state.colors.light }}
              >
                <form>
                  <div className="d-flex justify-content-center">
                    <div className="form-check mx-3 my-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colour"
                        id="#fff28f"
                        value="#ffffff"
                        onChange={handleChangeColour}
                        style={{ backgroundColor: "#fff28f" }}
                      />
                    </div>
                    <div className="form-check mx-3 my-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colour"
                        id="#addb58"
                        value="#defca7"
                        onChange={handleChangeColour}
                        style={{ backgroundColor: "#addb58" }}
                      />
                    </div>
                    <div className="form-check mx-3 my-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colour"
                        id="#fc5353"
                        value="#fcd2d2"
                        onChange={handleChangeColour}
                        style={{ backgroundColor: "#fc5353" }}
                      />
                    </div>
                    <div className="form-check mx-3 my-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colour"
                        id="#fa6e28"
                        value="#fab693"
                        onChange={handleChangeColour}
                        style={{ backgroundColor: "#fa6e28" }}
                      />
                    </div>
                    <div className="form-check mx-3 my-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colour"
                        id="#05faf6"
                        value="#b4faf9"
                        onChange={handleChangeColour}
                        style={{ backgroundColor: "#05faf6" }}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="form-check mx-3 my-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colour"
                        id="#667dfa"
                        value="#ccd4fc"
                        onChange={handleChangeColour}
                        style={{ backgroundColor: "#667dfa" }}
                      />
                    </div>
                    <div className="form-check mx-3 my-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colour"
                        id="#fa66f3"
                        value="#fabbf7"
                        onChange={handleChangeColour}
                        style={{ backgroundColor: "#fa66f3" }}
                      />
                    </div>
                    <div className="form-check mx-3 my-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colour"
                        id="#ff3b86"
                        value="#fcbbd4"
                        onChange={handleChangeColour}
                        style={{ backgroundColor: "#ff3b86" }}
                      />
                    </div>
                    <div className="form-check mx-3 my-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colour"
                        id="#52f7b2"
                        value="#c2fce4"
                        onChange={handleChangeColour}
                        style={{ backgroundColor: "#52f7b2" }}
                      />
                    </div>
                    <div className="form-check mx-3 my-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colour"
                        id="#807c7c"
                        value="#d9d7d7"
                        onChange={handleChangeColour}
                        style={{ backgroundColor: "#807c7c" }}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div
                className="modal-footer"
                style={{ backgroundColor: state.colors.dark }}
              >
                <button
                  type="button"
                  className={`btn btn-danger ${disableVal ? "d-none" : ""}`}
                  data-bs-dismiss="modal"
                  ref={refCloseColour}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleClickColour}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ChangeColour;
