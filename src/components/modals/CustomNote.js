import React, {
  forwardRef,
  useContext,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import ContextApi from "../../context/contextApi";

const CustomNote = forwardRef((props, ref) => {
  const refOpenCustom = useRef(null);
  const state = useContext(ContextApi);
  const [inputText, setInputText] = useState("");
  useImperativeHandle(ref, () => ({
    handleClick,
  }));
  const handleClick = () => {
    refOpenCustom.current.click();
  };
  const handleInput = (e) => {
    setInputText(e.target.value);
  };
  return (
    <>
      <button
        ref={refOpenCustom}
        type="button"
        className="d-none btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#customModal"
      >
        Launch Custom modal
      </button>
      <div
        className="modal fade"
        id="customModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
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
                Custom Note
              </h1>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    id="content"
                    rows="10"
                    placeholder="Start typing here..."
                    value={inputText}
                    onChange={handleInput}
                  ></textarea>
                </div>
              </form>
              <div className="d-flex">
                <div className="d-flex align-items-center border border-1 border-dark border-end-0">
                  <button
                    title="Words and Characters"
                    className="btn border-start border-end rounded-0"
                  >
                    <i className="fa-solid fa-file-lines"></i>
                  </button>
                  <div className="mx-2" style={{ width: "204px" }}>
                    {
                      inputText.split(/\s+/).filter((element) => {
                        return element.length !== 0;
                      }).length
                    }{" "}
                    words, {inputText.length} characters
                  </div>
                </div>
                <div className="d-flex align-items-center border border-1 border-dark ">
                  <button
                    title="Time to read"
                    className="btn border-start border-end rounded-0"
                  >
                    <i className="fa-solid fa-stopwatch"></i>
                  </button>
                  <div className="mx-2" style={{ width: "144px" }}>
                    {parseFloat(
                      0.008 *
                        inputText.split(/\s+/).filter((element) => {
                          return element.length !== 0;
                        }).length
                    ).toFixed(3)}{" "}
                    Minutes read
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-footer d-flex justify-content-between"
              style={{ backgroundColor: state.colors.dark }}
            >
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <button type="button" className="btn btn-success">
                Create Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default CustomNote;
