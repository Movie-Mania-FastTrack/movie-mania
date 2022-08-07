import axios from "axios";

export default axios.create({
    baseURL: "https://movieania.herokuapp.com/movie",
  });