import React from "react";
import "./App.css";
import MainContainer from "./nutritrack/MainContainer";

function App() {
  // PUBLIC_INTERFACE
  /**
   * App wraps the MainContainer for NutriTrack, removing any shell hero/template.
   */
  return <MainContainer />;
}

export default App;