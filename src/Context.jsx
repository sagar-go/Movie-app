import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

export const MainContext = createContext();

function Context({ children }) {
  let [src, setsrc] = useState("");
  let [sub, setsub] = useState("z");
  let [movie, setmovie] = useState([]);
  let [trend, settrend] = useState([]);
  let [fav, setfav] = useState([]);
  let [t, sett] = useState(false);
  let [random, setrandom] = useState([]);
  let [result, setresult] = useState([]);
  const [id, setid] = useState(316256);
  const [movieid, setmovieid] = useState([]);
  const [gen, setgen] = useState(0);
  const [fil, setfil] = useState([]);
  const [name, setname] = useState();
  const [videoId, setvideoId] = useState();
  const [show, setshow] = useState(false);

  useEffect(() => {
    let temp = localStorage.getItem("fav_movie");
    if (temp) {
      setfav(JSON.parse(temp));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fav_movie", JSON.stringify(fav));
  }, [fav]);

  return (
    <MainContext.Provider
      value={{
        src,
        show,
        setshow,
        setsrc,
        movie,
        setmovie,
        random,
        id,
        setid,
        setrandom,
        t,
        fav,
        setfav,
        t,
        sett,
        trend,
        settrend,
        sub,
        setsub,
        result,
        setresult,
        movieid,
        setmovieid,
        gen,
        setgen,
        fil,
        setfil,
        name,
        setname,
        videoId,
        setvideoId,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default Context;
