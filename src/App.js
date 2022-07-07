import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SingleMovieHome  from "./screens/SingleMovieHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/single_movie_home" element={<SingleMovieHome />} />
      </Routes>
    </Router>
  );
}

export default App;
