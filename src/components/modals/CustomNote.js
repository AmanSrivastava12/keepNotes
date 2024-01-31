import React, {
  forwardRef,
  useContext,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import ContextApi from "../../context/contextApi";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const CustomNote = forwardRef((props, ref) => {
  const { quill, quillRef } = useQuill();
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setInputText(quill.getText());
      });
    }
  }, [quill]);
  const refOpenCustom = useRef(null);
  const state = useContext(ContextApi);
  const [inputText, setInputText] = useState("");
  useImperativeHandle(ref, () => ({
    handleClick,
  }));
  const handleClick = () => {
    refOpenCustom.current.click();
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
              <div style={{ width: "100%", height: 380 }}>
                <div ref={quillRef} />
              </div>
            </div>
            <div
              className="modal-footer d-flex justify-content-between"
              style={{ backgroundColor: state.colors.dark }}
            >
              <div className="d-flex">
                <div className="d-flex align-items-center border border-1 border-dark border-end-0">
                  <button
                    title="Words and Characters"
                    className="btn"
                    style={{
                      borderRight: "1px solid black",
                      borderRadius: "0px",
                    }}
                  >
                    <i className="fa-solid fa-file-lines"></i>
                  </button>
                  <div
                    className="mx-2 d-flex justify-content-center"
                    style={{ width: "220px" }}
                  >
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
                    className="btn"
                    style={{
                      borderRight: "1px solid black",
                      borderRadius: "0px",
                    }}
                  >
                    <i className="fa-solid fa-stopwatch"></i>
                  </button>
                  <div
                    className="mx-2 d-flex justify-content-center"
                    style={{ width: "160px" }}
                  >
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
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  className="btn-close me-3"
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
      </div>
    </>
  );
});

export default CustomNote;
