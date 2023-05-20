import React from "react";
import ViewNotes from "../note/ViewNotes";
import AddNote from "../note/AddNote";
import Navbar from "./Navbar";
import Alert from "./Alert";

export default function Home() {
  return (
    <>
      <Navbar path="/home" />
      <Alert />
      <AddNote />
      <ViewNotes />
    </>
  );
}
