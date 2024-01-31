import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ContextApi from "../../context/contextApi";
import UpdateBlog from "../modals/UpdateBlog";

const ViewBlogs = () => {
  const state = useContext(ContextApi);
  const refOpenUpdate = useRef(null);
  const [blog, setBlog] = useState({
    _id: "",
    title: "",
    items: "",
    ttr: "",
  });
  const updateBlog = (currentBlog) => {
    refOpenUpdate.current.handleClick();
    setBlog(currentBlog);
  };
  return (
    <>
      <UpdateBlog blog={blog} setBlog={setBlog} ref={refOpenUpdate} />
      <div
        className="px-4 pt-4 pb-5"
        style={{
          backgroundImage: `linear-gradient(#fcd96d,${state.colors.light})`,
          minHeight: "82vh",
        }}
      >
        <h3 className="mb-4" style={{ fontFamily: state.fonts.font1 }}>
          Your Existing Blogs
        </h3>
        <div className="mb-5">
          <div className="ms-2" style={{ fontFamily: state.fonts.font2 }}>
            {state.blogs.length === 0 && "No existing blogs available."}
          </div>
          {state.blogs.map((blog) => {
            return (
              <div
                className="blog-element"
                key={blog._id}
                style={{
                  fontFamily: state.fonts.font2,
                }}
              >
                <div className="d-flex">
                  <div className="blog-content">
                    <h4>{blog.title}</h4>
                    {blog.items.length <= 200 ? (
                      <h6>{blog.items}</h6>
                    ) : (
                      <div>
                        <h6>
                          {blog.items.substr(0, 299)}{" "}
                          <span>
                            <Link
                              className="text-decoration-none fw-bold"
                              onClick={() => {
                                state.viewOneBlog(blog._id);
                              }}
                              to="/blogitem"
                            >
                              ...
                            </Link>
                          </span>
                        </h6>
                      </div>
                    )}
                  </div>
                  <div className="blog-icons">
                    <div className="blog-icons-top">
                      <i
                        title="Edit blog"
                        className="fa-sharp fa-regular fa-pen-to-square"
                        onClick={() => updateBlog(blog)}
                      ></i>
                    </div>
                    <div className="blog-icons-bottom">
                      <i
                        title="Delete blog"
                        className="fa-regular fa-trash-can"
                        onClick={() => {
                          state.deleteBlogs(blog._id);
                          setTimeout(() => {
                            state.viewBlogs();
                          }, 50);
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ViewBlogs;
