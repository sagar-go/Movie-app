import React, { useContext, useEffect } from "react";
import { MainContext } from "./Context";

function Fav() {
  const { fav, setfav, id, setid } = useContext(MainContext);
  const imgpath = `https://image.tmdb.org/t/p/w500`;

  const remove = (e) => {
    let temp = fav.filter((ele) => e.movie.id !== ele.movie.id);
    setfav(temp);
  };

  if (fav.length === 0) {
    return <h1 className="nothing">No movie added yet...</h1>;
  } else {
    return (
      <div className="container2">
        {fav.map((e) => (
          <div className="movie2" key={e.id}>
            <img src={`${imgpath}${e.movie.poster_path}`} alt="" />

            <button onClick={() => remove(e)}>Remove</button>
          </div>
        ))}
      </div>
    );
  }
}

export default Fav;
