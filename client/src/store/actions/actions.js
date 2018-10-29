import axios from "axios";

// Register User
export function addUser(user) {
  const { username, email, password } = user;
  return {
    type: "ADD_USER",
    payload: axios.post("http://localhost:5000/api/register", {
      username,
      email,
      password
    })
  };
}
// Login User
export function loginUser(user) {
  const { email, password } = user;
  return {
    type: "LOGIN_USER",
    payload: axios.post("http://localhost:5000/api/signin", {
      email,
      password
    })
  };
}
// GET USER
export function getUser() {
  return {
    type: "GET_USER",
    payload: axios.get("http://localhost:5000/api/user", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  };
}
// [auto] login user (force login only works if there is already a token.)
export function login() {
  return {
    type: "AUTO_LOGIN",
    payload: null
  };
}
// logout user
export function logoutUser() {
  return {
    type: "SIGN_OUT",
    payload: null
  };
}
// Edit User
export function editUser(id, user) {
  return {
    type: "EDIT_USER",
    payload: axios.patch(`http://localhost:5000/api/user/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      data: user
    })
  };
}

// Delete User
export function deleteUser(id) {
  return {
    type: "DELETE_USER",
    payload: axios.delete(`http://localhost:5000/api/user/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  };
}

// Get Blog List
export function getBlogList() {
  return {
    type: "GET_BLOG_LIST",
    payload: axios.get("http://localhost:5000/api/blogs", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  };
}
// Get Blog By ID
export function getBlog(id) {
  return {
    type: "GET_BLOG",
    payload: axios.get(`http://localhost:5000/api/blogs/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  };
}
// Add Blog
export function addBlog(title, body) {
  return {
    type: "ADD_BLOG",
    payload: axios.post(
      `http://localhost:5000/api/blogs`,
      {
        title,
        body
      },
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    )
  };
}

// Delete Blog
export function deleteBlog(id) {
  return {
    type: "DELETE_BLOG",
    payload: axios.delete(`http://localhost:5000/api/blogs/${id}`, {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  };
}

// Edit Blog
export function editBlog(id, title, body) {
  return {
    type: "EDIT_BLOG",
    payload: axios.patch(
      `http://localhost:5000/api/blogs/${id}`,
      {
        title,
        body
      },
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    )
  };
}
