import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage  from "./screens/User_Home_Page/HomePage";
import SingleMovieHome  from "./screens/SingleMovieHome";
import MovieTrailorPage  from "./screens/MovieTrailorPage";
import MovieCastHome  from "./screens/MovieCastHome";
import BuyMovieHome  from "./screens/BuyMovie/BuyMovieHome";
import SlipUploadHome  from "./screens/BuyMovie/SlipUploadHome";
import AdminHomePage  from "./screens/Admin_Home_Page/AdminHomePage";
import ManageMoviesHome  from "./screens/Admin_Manage_Movies/ManageMoviesHome";
import AddNewMovieScreen from "./screens/AddNewMovie/AddNewMovieScreen";
import EditNewMovieScreen from "./screens/EditNewMovie/EditMovieScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/single_movie_home" element={<SingleMovieHome />} />
        <Route path="/movie_trailor_page" element={<MovieTrailorPage />} />
        <Route path="/cast_page" element={<MovieCastHome />} />
        <Route path="/buy_page" element={<BuyMovieHome/>} />
        <Route path="/slip_upload_page" element={<SlipUploadHome/>} />
        <Route path="/admin_home_page" element={<AdminHomePage/>} />
        <Route path="/add_new_movie" element={<AddNewMovieScreen/>} />
        <Route path="/manage_movie_home" element={<ManageMoviesHome />} />
        <Route path="/edit_movie" element={<EditNewMovieScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
