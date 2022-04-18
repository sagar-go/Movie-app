import React, { useContext, useEffect } from "react";
import { MainContext } from "./Context";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ToastContainer, toast } from "react-toastify";

function Result() {
  const {
    name,
    setshow,
    t,
    fav,
    setfav,
    sett,
    setmovieid,
    sub,
    setsub,
    result,
    setresult,
    id,
    setid,
  } = useContext(MainContext);
  const imgpath = `https://image.tmdb.org/t/p/w500`;

  const closeAfter15 = () =>
    toast("Movie added to Watchlist", { autoClose: 1000 });

  const closeAfter10 = () =>
    toast("Removed from Watchlist", { autoClose: 1000 });
  const addfav = (e) => {
    let data = { movie: e, com: t };
    const temp = [...fav, data];
    setfav(temp);
    closeAfter15();

    let abc = result.map((ele) => {
      if (ele.id === e.id) {
        return { ...ele, adult: !ele.adult };
      }
      return ele;
    });
    setresult(abc);
  };

  const remove = (e) => {
    closeAfter10();
    let temp2 = fav.filter((ele) => e.id !== ele.movie.id);
    setfav(temp2);

    let abc = result.map((ele) => {
      if (ele.id === e.id) {
        return { ...ele, adult: !ele.adult };
      }
      return ele;
    });
    setresult(abc);
  };

  const banner = (e) => {
    setid(e);
    console.log("id is", id);
    setshow(false);
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          initialSlide: 5,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="head">
        <h1 className="title"> Your Search Results for : {sub} </h1>
        <div className="container222">
          <Slider {...settings}>
            {result.map((e) => (
              <div className="movie" key={e.id}>
                {
                  <img
                    src={`${imgpath}${e.poster_path}`}
                    alt=""
                    onClick={() => banner(e.id)}
                  />
                }
                {e.adult === true ? (
                  <button onClick={() => remove(e)}>
                    Remove from Watchlist
                  </button>
                ) : (
                  <button onClick={() => addfav(e)}>Watch later</button>
                )}
              </div>
            ))}
          </Slider>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Result;
