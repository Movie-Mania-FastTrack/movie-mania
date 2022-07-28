import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage  from "./screens/HomePage";
import SingleMovieHome  from "./screens/SingleMovieHome";
import MovieTrailorPage  from "./screens/MovieTrailorPage";
import MovieCastHome  from "./screens/MovieCastHome";
import BuyMovieHome  from "./screens/BuyMovieHome";
import AdminHomePage  from "./screens/AdminHomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/single_movie_home" element={<SingleMovieHome />} />
        <Route path="/movie_trailor_page" element={<MovieTrailorPage />} />
        <Route path="/cast_page" element={<MovieCastHome />} />
        <Route path="/buy_page" element={<BuyMovieHome/>} />
        <Route path="/admin_home_page" element={<AdminHomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
