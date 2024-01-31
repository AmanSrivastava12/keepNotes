import React, {
  forwardRef,
  useContext,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import ContextApi from "../../context/contextApi";

const UpdateBlog = forwardRef((props, ref) => {
  const state = useContext(ContextApi);
  const refOpenUpdate = useRef(null);
  const refCloseUpdate = useRef(null);
  const [rowNum, setRowNum] = useState(16);
  useImperativeHandle(ref, () => ({
    handleClick,
  }));
  const handleClick = () => {
    setTimeout(() => {
      refOpenUpdate.current.click();
    }, 50);
  };
  const handleChangeUpdate = (e) => {
    props.setBlog({ ...props.blog, [e.target.id]: e.target.value });
  };
  const handleClickUpdate = () => {
    state.updateBlogs(
      props.blog._id,
      props.blog.title,
      props.blog.items,
      readTime
    );
    refCloseUpdate.current.click();
    setTimeout(() => {
      state.viewBlogs();
    }, 50);
  };
  let readTime = parseFloat(
    0.008 *
      props.blog.items.split(/\s+/).filter((element) => {
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
        id="updateModal"
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
                  id="title"
                  value={props.blog.title}
                  onChange={(e) => {
                    handleChangeUpdate(e);
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
                ref={refCloseUpdate}
              ></button>
            </div>
            <div className="modal-body">
              <div style={{ width: "100%", height: "376px" }}>
                <textarea
                  rows={rowNum}
                  value={props.blog.items}
                  id="items"
                  onChange={(e) => {
                    changeSize(e);
                    handleChangeUpdate(e);
                  }}
                  placeholder="Enter contents of the blog (100 characters minimum)"
                  minLength={10}
                  style={{
                    padding: "10px",
                    width: "100%",
                    height: "100%",
                  }}
                  required
                />
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
                      props.blog.items.split(/\s+/).filter((element) => {
                        return element.length !== 0;
                      }).length
                    }{" "}
                    words, {countCharacters(props.blog.items)} characters
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
                  disabled={countCharacters(props.blog.items) < 100}
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
    </>
  );
});

export default UpdateBlog;
