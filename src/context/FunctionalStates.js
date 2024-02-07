import React, { useState } from "react";
import ContextApi from "./contextApi";

const FunctionalStates = (props) => {
  const [notes, setNotes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [oneBlog, setOneBlog] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [alert, setAlert] = useState(null);
  const host = `${process.env.REACT_APP_BACKEND_HOST}/api`;
  let colors = { dark: "#fff28f", light: "#fcf9dc" };
  let fonts = {
    font1: "'Electrolize', sans-serif",
    font2: "'Marcellus', serif",
    font3: "'Chakra Petch', sans-serif",
  };

  const createNotes = async (title, items, tag, colourDark, colourLight) => {
    const response = await fetch(`${host}/note/createNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, items, tag, colourDark, colourLight }),
    });
    const json = await response.json();
    const note = json;
    setNotes(notes.concat(note));
    showAlert("success", "Note added successfully");
  };

  const viewNotes = async () => {
    const response = await fetch(`${host}/note/viewNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const allNotes = await response.json();
    setNotes(allNotes);
  };

  const updateNotes = async (
    id,
    title,
    items,
    tag,
    colourDark,
    colourLight
  ) => {
    await fetch(`${host}/note/updateNotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, items, tag, colourDark, colourLight }),
    });
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      if (notes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].items = items;
        newNotes[index].tag = tag;
        newNotes[index].colourDark = colourDark;
        newNotes[index].colourLight = colourLight;
        break;
      }
    }
    setNotes(newNotes);
    showAlert("success", "Note updated successfully");
  };

  const deleteNotes = async (id) => {
    await fetch(`${host}/note/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    setNotes(notes.filter((note) => note._id !== id));
    showAlert("success", "Note deleted successfully");
  };

  const sendNotes = async (title, items, tag) => {
    let email = localStorage.getItem("userEmail");
    const response = await fetch(`${host}/mail/sendNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, items, tag, email }),
    });
    const json = await response.json();
    if (json.success) {
      showAlert("success", "Note has been sent to the email successfully");
    }
  };

  const createBlogs = async (title, items, ttr) => {
    const response = await fetch(`${host}/blog/createBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, items, ttr }),
    });
    const json = await response.json();
    const blog = json;
    setBlogs(blogs.concat(blog));
    showAlert("success", "Blog saved successfully");
  };

  const viewBlogs = async () => {
    const response = await fetch(`${host}/blog/viewBlogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const allBlogs = await response.json();
    setBlogs(allBlogs);
  };

  const viewOneBlog = async (id) => {
    const response = await fetch(`${host}/blog/viewOneBlog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const fetchedBlog = await response.json();
    setOneBlog(fetchedBlog);
  };

  const updateBlogs = async (id, title, items) => {
    await fetch(`${host}/blog/updateBlogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, items }),
    });
    let newBlogs = JSON.parse(JSON.stringify(blogs));
    for (let index = 0; index < blogs.length; index++) {
      if (blogs[index]._id === id) {
        newBlogs[index].title = title;
        newBlogs[index].items = items;
        break;
      }
    }
    setBlogs(newBlogs);
    showAlert("success", "Blog updated successfully");
  };

  const deleteBlogs = async (id) => {
    await fetch(`${host}/blog/deleteBlogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    setBlogs(blogs.filter((blog) => blog._id !== id));
    showAlert("success", "Blog deleted successfully");
  };

  const userRegister = async (name, age, gender, contact, email, password) => {
    const response = await fetch(`${host}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: age,
        gender: gender,
        contact: contact,
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      showAlert("success", "Account created successfully");
    }
    return json;
  };

  const userLogin = async (type, email, password) => {
    const response = await fetch(`${host}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Type": type,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    showAlert("success", "Logged in successfully");
    return json;
  };

  const userAccount = async () => {
    const response = await fetch(`${host}/user/myAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.success) {
      setCurrentUser(json.user);
    } else {
      showAlert("danger", json.error);
    }
  };

  const verifyUser = async (email) => {
    const response = await fetch(`${host}/user/verifyUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const json = await response.json();
    return json;
  };

  const sendPassResetRequest = async (email, link, name) => {
    const response = await fetch(`${host}/mail/sendPassResetRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, link, name }),
    });
    const json = await response.json();
    if (json.success) {
      showAlert(
        "success",
        "Password Reset Request sent successfully. Please check your email and reset your password."
      );
    } else {
      console.log(json.error);
    }
  };

  const updateUserPassword = async (resetKey, id, password) => {
    const response = await fetch(`${host}/user/resetPass`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resetKey: resetKey,
        id: id,
        password: password,
      }),
    });
    const json = await response.json();
    return json;
  };

  const viewUsers = async () => {
    const response = await fetch(`${host}/admin/viewUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const allUsers = await response.json();
    setUsers(allUsers.users);
  };

  const updateUsers = async (id, name, age, gender, contact, email) => {
    await fetch(`${host}/admin/updateUsers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, age, gender, contact, email }),
    });
    let newUser = JSON.parse(JSON.stringify(users));
    for (let index = 0; index < users.length; index++) {
      if (users[index]._id === id) {
        newUser[index].name = name;
        newUser[index].age = age;
        newUser[index].gender = gender;
        newUser[index].contact = contact;
        newUser[index].email = email;
        break;
      }
    }
    setUsers(newUser);
    showAlert("success", "User updated successfully");
  };

  const deleteUsers = async (id) => {
    await fetch(`${host}/admin/deleteUsers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    setUsers(users.filter((user) => user._id !== id));
    setNotes(notes.filter((note) => note.user !== id));
    setBlogs(blogs.filter((blog) => blog.user !== id));
    showAlert("success", "User deleted successfully");
  };

  const showAlert = (type, message) => {
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <ContextApi.Provider
      value={{
        colors,
        fonts,
        notes,
        viewNotes,
        createNotes,
        deleteNotes,
        updateNotes,
        sendNotes,
        sendPassResetRequest,
        users,
        viewUsers,
        updateUsers,
        updateUserPassword,
        deleteUsers,
        alert,
        showAlert,
        currentUser,
        userRegister,
        userLogin,
        userAccount,
        verifyUser,
        blogs,
        oneBlog,
        createBlogs,
        viewBlogs,
        viewOneBlog,
        updateBlogs,
        deleteBlogs,
      }}
    >
      {props.children}
    </ContextApi.Provider>
  );
};

export default FunctionalStates;
