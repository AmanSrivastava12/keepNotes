import React, { useContext, useState } from "react";
import ContextApi from "../../context/contextApi";

const AddNote = () => {
  const state = useContext(ContextApi);
  const [rowNum, setRowNum] = useState(1);
  const [titleVal, setTitleVal] = useState("");
  const [contentVal, setContentVal] = useState("");
  const [tagVal, setTagVal] = useState("");
  const handleChangeofTitle = (e) => {
    e.target.value ? setTitleVal(e.target.value) : setTitleVal("No title");
  };
  const handleChangeofContent = (e) => {
    if (e.target.offsetHeight < e.target.scrollHeight) {
      setRowNum(rowNum + 1);
    }
    setContentVal(e.target.value);
  };
  const handleChangeofTag = (e) => {
    e.target.value ? setTagVal(e.target.value) : setTagVal("none");
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (titleVal === "" && tagVal === "") {
      state.createNotes("No title", contentVal, "none", "#fff28f", "#ffffff");
    } else if (titleVal === "") {
      state.createNotes("No title", contentVal, tagVal, "#fff28f", "#ffffff");
    } else if (tagVal === "") {
      state.createNotes(titleVal, contentVal, "none", "#fff28f", "#ffffff");
    } else {
      state.createNotes(titleVal, contentVal, tagVal, "#fff28f", "#ffffff");
    }
    state.viewNotes();
    handleResetClick();
  };
  const handleResetClick = () => {
    setContentVal("");
    setTagVal("");
    setTitleVal("");
    setRowNum(1);
  };

  return (
    <>
      <div
        className="p-3"
        style={{
          backgroundColor: state.colors.dark,
          height: "fit-content",
        }}
      >
        <form className="d-flex" autoComplete="off">
          <div className="me-2" style={{ width: "27%" }}>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title of the note (optional)"
              value={titleVal}
              onChange={handleChangeofTitle}
            />
          </div>
          <div className="me-2" style={{ width: "34.6%" }}>
            <textarea
              type="text"
              className="form-control"
              id="items"
              onChange={handleChangeofContent}
              value={contentVal}
              rows={rowNum}
              placeholder="Enter contents of the note"
              minLength={5}
              required
            />
          </div>
          <div className="me-2" style={{ width: "23%" }}>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={tagVal}
              placeholder="Enter tag(s) associated (optional)"
              onChange={handleChangeofTag}
            />
          </div>
          <div className="d-flex">
            <button
              disabled={contentVal.length < 5}
              type="submit"
              className="btn btn-success me-2"
              onClick={handleSubmitClick}
            >
              Add Note
            </button>
            <button
              type="reset"
              className="btn btn-warning"
              onClick={handleResetClick}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNote;
