import { useState } from "react";
import "./App.css";
import RecipeManager from "./components/recipe-manager/RecipeManager.jsx";
import LoadingBar from "./components/LoadingBar.jsx";

function App() {
  return (
    <div>
      <LoadingBar />
      <RecipeManager></RecipeManager>
    </div>
  );
}

export default App;
