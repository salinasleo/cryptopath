import axios from "axios";

export default {

  // Gets all users
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  login: function (username) {
    return axios.get("/api/users/login/" + username);
  },
  // Deletes the user with the given id
  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },
  saveUser: function (stuff) {
    console.log("hello world");
    console.log(stuff);
    return axios.post("/api/users", stuff);
  }
};

