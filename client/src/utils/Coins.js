import axios from "axios";

export default {

  // Gets all Coins
  getCoins: function () {
    return axios.get("/api/coins");
  },
  // Gets the Coin with the given id
  getCoin: function (id) {
    return axios.get("/api/coins/" + id);
  },
  login: function (Coinname) {
    return axios.get("/api/coins/login/" + Coinname);
  },
  // Deletes the Coin with the given id
  deleteCoin: function (id) {
    return axios.delete("/api/coins/" + id);
  },
  saveCoin: function (stuff) {
    console.log("hello world coin");
    console.log(stuff);
    return axios.post("/api/coins", stuff);
  }
};
