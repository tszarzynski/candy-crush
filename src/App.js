import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import { StateProvider } from "./state/provider";

function App() {
  return (
    <StateProvider>
      <Grid></Grid>
    </StateProvider>
  );
}

export default App;
