import "./assets/styles/App.css";
import React, { useState } from "react";
import { Header, GameField } from "./components/";
 
function App() {
  return (
    <div id="container">
      <Header />
      <main>
        <GameField />
      </main>
    </div>
  );
}

export default App;
