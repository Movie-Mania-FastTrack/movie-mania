import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage  from "./screens/User_Home_Page/HomePage";
import SingleMovieHome  from "./screens/SingleMovieHome";

import MovieCastHome  from "./screens/MovieCastHome";
import BuyMovieHome  from "./screens/BuyMovie/BuyMovieHome";
import SlipUpload  from "./screens/BuyMovie/SlipUpload";
import AdminHomePage  from "./screens/Admin_Home_Page/AdminHomePage";
import ManageMoviesHome  from "./screens/Admin_Manage_Movies/ManageMoviesHome";
import AddNewMovieScreen from "./screens/AddNewMovie/AddNewMovieScreen";
import EditNewMovieScreen from "./screens/EditNewMovie/EditMovieScreen";
import MultipleMovieSelect from "./screens/BuyMovie/MultipleMovieSelectHome";
import MovieRequestScreen from "./screens/Admin_Home_Page/MovieRequestScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/single_movie_home" element={<SingleMovieHome />} />
       
        <Route path="/cast_page" element={<MovieCastHome />} />
        <Route path="/buy_page" element={<BuyMovieHome/>} />
        <Route path="/slip_upload_page" element={<SlipUpload/>} />
        <Route path="/admin_home_page" element={<AdminHomePage/>} />
        <Route path="/add_new_movie" element={<AddNewMovieScreen/>} />
        <Route path="/manage_movie_home" element={<ManageMoviesHome />} />
        <Route path="/edit_movie" element={<EditNewMovieScreen />} />
        <Route path="/multiple_movie_select" element={<MultipleMovieSelect />} />
        <Route path="/movie_requests" element={<MovieRequestScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
