import React, { useContext, useRef, useState } from "react";
import ContextApi from "../../context/contextApi";
import NoteItem from "./NoteItem";
import ChangeColour from "../modals/ChangeColour";
import UpdateNote from "../modals/UpdateNote";

const ViewNotes = () => {
  const state = useContext(ContextApi);
  const refOpenUpdate = useRef(null);
  const refOpenColour = useRef(null);
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
      <div
        className="p-4"
        style={{
          backgroundImage: `linear-gradient(#fcd96d,${state.colors.light})`,
          minHeight: "70vh",
        }}
      >
        <h3 className="mb-4" style={{ fontFamily: state.fonts.font1 }}>
          Your Existing Notes
        </h3>
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
