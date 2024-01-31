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
  const refCloseCustom = useRef(null);
  const state = useContext(ContextApi);
  const [titleVal, setTitleVal] = useState("");
  const [itemsVal, setItemsVal] = useState("");
  const [rowNum, setRowNum] = useState(16);
  useImperativeHandle(ref, () => ({
    handleClick,
  }));
  const handleClick = () => {
    refOpenCustom.current.click();
  };
  const clearText = () => {
    setTitleVal("");
    setItemsVal("");
  };
  const handleCreate = () => {
    refCloseCustom.current.click();
    if (titleVal === "") {
      state.createBlogs("No title", itemsVal, readTime);
    } else {
      state.createBlogs(titleVal, itemsVal, readTime);
    }
    clearText();
  };
  const changeTitleVal = (e) => {
    setTitleVal(e.target.value);
  };
  const changeItemsVal = (e) => {
    setItemsVal(e.target.value);
  };
  let readTime = parseFloat(
    0.008 *
      itemsVal.split(/\s+/).filter((element) => {
        return element.length !== 0;
      }).length
  ).toFixed(3);
  const changeSize = (e) => {
    if (e.target.offsetHeight < e.target.scrollHeight) {
      setRowNum(rowNum + 1);
    }
  };
  const countCharacters = (text) => {
    const spaceRegex = / /g;
    const matches = text.match(spaceRegex);
    const charlen = text.length;
    if (matches != null) return charlen - matches.length;
    else return charlen;
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
                className="modal-title fs-5 px-2"
                id="staticBackdropLabel"
                style={{ fontFamily: state.fonts.font2 }}
              >
                <input
                  type="text"
                  value={titleVal}
                  placeholder="Write something"
                  onChange={(e) => {
                    changeTitleVal(e);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                  }}
                />
              </h1>
              <button
                type="button"
                className="btn-close me-1"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refCloseCustom}
                onClick={() => {
                  clearText();
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div style={{ width: "100%", height: "376px" }}>
                <textarea
                  rows={rowNum}
                  value={itemsVal}
                  id="items"
                  onChange={(e) => {
                    changeSize(e);
                    changeItemsVal(e);
                  }}
                  placeholder="Enter contents of the blog (100 characters minimum)"
                  minLength={10}
                  style={{
                    padding: "10px",
                    width: "100%",
                    height: "100%",
                  }}
                  required
                ></textarea>
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
                      itemsVal.split(/\s+/).filter((element) => {
                        return element.length !== 0;
                      }).length
                    }{" "}
                    words, {countCharacters(itemsVal)} characters
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
                    {readTime} Minutes read
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <button
                  disabled={countCharacters(itemsVal) < 100}
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    handleCreate();
                  }}
                >
                  Create
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
