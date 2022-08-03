import React from "react";
import EditMovieForm from "./EditMovieForm";
import Screen_Layout from "../common_components/ScreenLayout";

function EditNewMovieScreen() {
  return (
    <Screen_Layout
      department={"Administration"}
      back={"/"}
      home={"/"}
      Component={<EditMovieForm />}
    />
  );
}

export default EditNewMovieScreen;
