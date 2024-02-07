import React, { useRef } from "react";
import Navbar from "../general/Navbar";
import Alert from "../general/Alert";
import CreateBlog from "../modals/CreateBlog";
import ViewBlogs from "./ViewBlogs";

const Bloghome = () => {
  const refOpenCustom = useRef(null);
  const handleClickCustom = () => {
    refOpenCustom.current.handleClick();
  };
  return (
    <>
      <CreateBlog ref={refOpenCustom} />
      <div className="sticky-top">
        <Navbar path="/bloghome" />
        <Alert />
      </div>
      <ViewBlogs />
      <button
        className="btn position-fixed bottom-0 end-0 newBlogBtn rounded-pill mb-3 me-3 p-3 fw-bold"
        onClick={() => {
          handleClickCustom();
        }}
        style={{ backgroundColor: "#fcd96d" }}
      >
        <span className="p-2">Create new blog</span>
        <i className="fa-solid fa-pen p-2"></i>
      </button>
    </>
  );
};

export default Bloghome;
