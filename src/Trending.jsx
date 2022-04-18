import React, { useContext, useEffect } from "react";
import { MainContext } from "./Context";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ToastContainer, toast } from "react-toastify";

function Trending() {
  const { setshow, t, fav, setfav, sett, trend, settrend, id, setid } =
    useContext(MainContext);

  const page = `https://api.themoviedb.org/3/discover/movie?api_key=85e6c5e0fa4643b730fc19eb23518ce8&page=2`;
  const imgpath = `https://image.tmdb.org/t/p/w500`;

  useEffect(() => {
    apicall();
  }, []);

  const closeAfter15 = () =>
    toast("Movie added to Watchlist", { autoClose: 1000 });

  const closeAfter10 = () =>
    toast("Removed from Watchlist", { autoClose: 1000 });

  const addfav = (e) => {
    closeAfter15();
    let data = { movie: e, com: t };
    const temp = [...fav, data];
    setfav(temp);

    let abc = trend.map((ele) => {
      if (ele.id === e.id) {
        return { ...ele, adult: !ele.adult };
      }
      return ele;
    });
    settrend(abc);
  };

  const apicall = async () => {
    let response = await fetch(page);
    let resdata = await response.json();
    let data = resdata.results;
    settrend(data);
  };
  const banner = (e) => {
    setid(e);
    console.log("id is", id);
    setshow(false);
  };

  const remove = (e) => {
    let temp2 = fav.filter((ele) => e.id !== ele.movie.id);
    setfav(temp2);

    closeAfter10();

    let abc = trend.map((ele) => {
      if (ele.id === e.id) {
        return { ...ele, adult: !ele.adult };
      }
      return ele;
    });
    settrend(abc);
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
      {" "}
      <div className="head2">
        <h1 className="title">Trending Now</h1>
        <div className="container222">
          <Slider {...settings}>
            {trend.map((e) => (
              <div className="movie" key={e.id}>
                <img
                  src={`${imgpath}${e.poster_path}`}
                  onClick={() => banner(e.id)}
                  alt=""
                />
                {e.adult === true ? (
                  <button onClick={() => remove(e)}>
                    Remove from watchlist
                  </button>
                ) : (
                  <button onClick={() => addfav(e)}>Watch Later</button>
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

export default Trending;
