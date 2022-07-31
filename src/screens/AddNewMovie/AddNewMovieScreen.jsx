import React from "react";
import AddNewMovieForm from "./AddNewMovieForm";
import Screen_Layout from "../common_components/ScreenLayout";

function AddNewMovieScreen() {
  return (
    <Screen_Layout
      department={"Administration"}
      back={"/"}
      home={"/"}
      Component={<AddNewMovieForm />}
    />
  );
}

export default AddNewMovieScreen;
