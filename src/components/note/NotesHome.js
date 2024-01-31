import React from "react";
import ViewNotes from "./ViewNotes";
import AddNote from "./AddNote";
import Navbar from "../general/Navbar";
import Alert from "../general/Alert";

const NotesHome = () => {
  return (
    <>
      <div className="sticky-top">
        <Navbar path="/home" />
        <Alert />
        <AddNote />
      </div>
      <ViewNotes />
    </>
  );
};

export default NotesHome;
