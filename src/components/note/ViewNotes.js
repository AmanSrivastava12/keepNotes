import React, { useContext, useRef, useState } from "react";
import ContextApi from "../../context/contextApi";
import NoteItem from "./NoteItem";
import CustomNote from "../modals/CustomNote";
import ChangeColour from "../modals/ChangeColour";
import UpdateNote from "../modals/UpdateNote";

const ViewNotes = () => {
  const state = useContext(ContextApi);
  const refOpenUpdate = useRef(null);
  const refOpenColour = useRef(null);
  const refOpenCustom = useRef(null);
  const [rowNum, setRowNum] = useState(1);
  const [note, setNote] = useState({
    _id: "",
    title: "",
    items: "",
    tag: "",
    colourDark: "#fff28f",
    colourLight: "#ffffff",
  });
  const updateNote = (currentNote) => {
    setRowNum(1);
    refOpenUpdate.current.handleClick();
    setNote(currentNote);
  };
  const changeColour = (currentNote) => {
    refOpenColour.current.handleClick();
    setNote(currentNote);
  };
  const handleClickCustom = () => {
    refOpenCustom.current.handleClick();
  };
  return (
    <>
      <UpdateNote
        note={note}
        setNote={setNote}
        ref={refOpenUpdate}
        rowNum={rowNum}
        setRowNum={setRowNum}
      />
      <ChangeColour note={note} setNote={setNote} ref={refOpenColour} />
      <CustomNote ref={refOpenCustom} />
      <div
        className="p-4"
        style={{
          backgroundImage: `linear-gradient(#fcd96d,${state.colors.light}, white)`,
          minHeight: "70vh",
        }}
      >
        <div
          className="d-flex justify-content-between mb-4"
          style={{ fontFamily: state.fonts.font1 }}
        >
          <h3 className="">Your Existing Notes</h3>
          <button
            title="Create a custom note"
            className="btn btn-warning p-1 pb-0"
            onClick={() => {
              handleClickCustom();
            }}
          >
            <i className="fa-solid fa-plus mb-2 px-2"></i>
          </button>
        </div>
        <div className="row">
          <div className="ms-2" style={{ fontFamily: state.fonts.font2 }}>
            {state.notes.length === 0 && "No existing notes available."}
          </div>
          {state.notes.map((note) => {
            return (
              <NoteItem
                note={note}
                updateNote={updateNote}
                changeColour={changeColour}
                key={note._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ViewNotes;
