import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SingleMovieHome  from "./screens/SingleMovieHome";
import MovieTrailorPage  from "./screens/MovieTrailorPage";
import MovieCast  from "./screens/MovieCast";
import BuyMovie  from "./screens/BuyMovie";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/single_movie_home" element={<SingleMovieHome />} />
        <Route path="/movie_trailor_page" element={<MovieTrailorPage />} />
        <Route path="/cast_page" element={<MovieCast />} />
        <Route path="/buy_page" element={<BuyMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
