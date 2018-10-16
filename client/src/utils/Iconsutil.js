import axios from "axios";

export default {

  // Gets all icons
  getIcons: function () {
    return axios.get("/api/icons");
  }
};