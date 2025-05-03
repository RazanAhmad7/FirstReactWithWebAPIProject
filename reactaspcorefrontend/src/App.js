// src/App.js
import React from "react";
import BookCrud from "./components/BookCrud";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <h1>Book Management</h1>
      <BookCrud />
    </div>
  );
}

export default App;
