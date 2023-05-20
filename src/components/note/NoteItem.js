import React, { useContext } from "react";
import ContextApi from "../../context/contextApi";

const NoteItem = (props) => {
  const state = useContext(ContextApi);

  return (
    <>
      <div className="col-md-3 mb-4">
        <div className="note-element" style={{ fontFamily: state.fonts.font3 }}>
          <h5
            className="note-element-title"
            style={{
              backgroundColor: props.note.colourDark,
            }}
          >
            {props.note.title}
          </h5>
          <div
            className="note-element-content"
            style={{
              backgroundColor: props.note.colourLight,
            }}
          >
            {props.note.items}
          </div>
          <hr className="note-divider" />
          <div
            className="note-element-tag"
            style={{
              backgroundColor: props.note.colourLight,
            }}
          >
            tag(s) - {props.note.tag}
          </div>
          <div
            className="note-element-icons"
            style={{
              backgroundColor: props.note.colourDark,
            }}
          >
            <i
              title="Delete this note"
              className="note-element-icon fa-regular fa-trash-can"
              onClick={() => {
                state.deleteNotes(props.note._id);
                state.viewNotes();
              }}
            ></i>
            <i
              title="Edit this note"
              className="note-element-icon note-element-icon-left fa-sharp fa-regular fa-pen-to-square"
              onClick={() => props.updateNote(props.note)}
            ></i>
            <i
              title="Change color"
              className={`note-element-icon note-element-icon-right fa-solid fa-eye-dropper`}
              onClick={() => {
                props.changeColour(props.note);
              }}
            ></i>
            <i
              title="Mail this note"
              className="note-element-icon fa-sharp fa-regular fa-envelope"
              onClick={() => {
                state.sendNotes(
                  props.note.title,
                  props.note.items,
                  props.note.tag
                );
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
