import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "./Context";
import YouTube from "react-youtube";
import { RiStarSmileLine } from "react-icons/ri";

function Id() {
  const { movieid, setmovieid, name, videoId, setvideoId, show, setshow } =
    useContext(MainContext);
  const imgpath = `https://image.tmdb.org/t/p/original`;

  let api = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${name}trailer&maxResults=1&key=  AIzaSyCNXuOSPU4a3DZQEKB3cjl4h_w2rvDGkUY`;

  const opts = {
    height: "400",
    width: "100%",
  };

  console.log("movieod", movieid);
  return (
    <>
      {movieid.map((e) => (
        <div className="random" key={e.id}>
          <div className="random2">
            <h1>
              {e.title}&nbsp; &nbsp;{" "}
              <RiStarSmileLine color={"yellow"}></RiStarSmileLine> &nbsp;
              {e.vote_average}
            </h1>
            <p>{e.overview.substring(0, 200)}</p>
            {/* {show ? (
              <div className="player">
                <YouTube videoId={videoId} opts={opts} onEnd={end} />
              </div>
            ) : (
              ""
            )} */}
            {/* {show ? (
              <button className="buttonplayer1" onClick={() => setshow(false)}>
                Stop Trailer
              </button>
            ) : (
              <button className="buttonplayer2" onClick={() => setshow(true)}>
                Play Trailer
              </button>
            )} */}
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

export default Id;
