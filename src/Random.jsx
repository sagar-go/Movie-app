import React, { useContext } from "react";
import { MainContext } from "./Context";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiStarSmileLine } from "react-icons/ri";

function Random() {
  const { random } = useContext(MainContext);
  const imgpath = `https://image.tmdb.org/t/p/original`;
  if (random.length === 0) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <>
      {random.map((e) => (
        <div className="random" key={e.id}>
          <div className="random2">
            <h4>
              {e.title} &nbsp; &nbsp;{" "}
              <RiStarSmileLine size={"25px"} color={"yellow"}></RiStarSmileLine>{" "}
              &nbsp;
              {e.vote_average}
            </h4>
            <span></span>
            <p>{e.overview}</p>
          </div>
          {e.backdrop_path ? (
            <img src={`${imgpath}${e.backdrop_path}`} />
          ) : (
            <img
              className="no-image"
              src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
            ></img>
          )}
        </div>
      ))}
    </>
  );
}

export default Random;
