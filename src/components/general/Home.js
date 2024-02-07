import React, { useContext } from "react";
import ContextApi from "../../context/contextApi";
import Navbar from "./Navbar";
import Alert from "./Alert";

export default function Home() {
  const state = useContext(ContextApi);
  return (
    <>
      <div className="sticky-top">
        <Navbar path="/home" />
        <Alert />
      </div>
      <div
        className="pt-5 px-4"
        style={{
          backgroundImage: `linear-gradient(#fcd96d,${state.colors.light})`,
          minHeight: "82vh",
          fontFamily: state.fonts.font2,
        }}
      >
        <h5 style={{ minHeight: "60vh" }}>
          KeepNotes is a website that allows you to make notes as well as write
          blogs and save them for future use.
        </h5>
        <p className="text-center fw-bold">
          Your Saved Notes - {state.notes.length}
          <br />
          Your Saved Blogs - {state.blogs.length}
        </p>
      </div>
    </>
  );
}
