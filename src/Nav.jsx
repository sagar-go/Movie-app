import React, { useContext, useState } from "react";
import "./App.css";
import { FaGripLines } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

import { BrowserRouter as Router, Link } from "react-router-dom";
import { MainContext } from "./Context";

function Nav() {
  const { src, setsrc, movie, setmovie, sub, setsub, t, fav, setfav, sett } =
    useContext(MainContext);
  let [tog, settog] = useState(true);

  const change = (e) => {
    setsrc(e.target.value);
    console.log(e.target.value);
  };
  const onsub = () => {
    setsub(src);

    console.log("sub is", sub);
    setsrc("");
  };
  console.log("sub is out", sub);
  const cha = () => {
    settog(!tog);
    console.log("AAAAAAAAAAAAAAA");
  };

  return (
    <div>
      <nav>
        <h2 onClick={() => cha()} className={`${tog ? "qq" : "link2"}`}>
          {" "}
          <FaGripLines />
        </h2>

        <ul>
          <div className="left">
            <Link to="/" className="link">
              {" "}
              <li> Home</li>{" "}
            </Link>
            <Link to="/fav" className="link">
              {" "}
              <li> Favorite</li>{" "}
            </Link>
            <Link to="/genre" className="link">
              {" "}
              <li> Genre</li>{" "}
            </Link>
          </div>

          <div className="srcicon">
            <input type="text" onChange={change} value={src} />
            <Link to="/">
              <AiOutlineSearch onClick={onsub} className="srcicon22" />
            </Link>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
