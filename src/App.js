import React from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./Fav";
import Main from "./Main";
import Nav from "./Nav";
import Fav from "./Fav";
import Genre from "./Genre";
import Id from "./Id";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/fav" element={<Fav />} />
          <Route path="/genre" element={<Genre />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
