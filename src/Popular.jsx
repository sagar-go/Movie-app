import React, { useContext, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MainContext } from "./Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Popular() {
  const [popular, setpopular] = useState([]);
  const { name, setshow, t, fav, setfav, sett, trend, settrend, id, setid } =
    useContext(MainContext);
  const navigate = useNavigate();
  const closeAfter15 = () =>
    toast("Movie added to Watchlist", { autoClose: 1000 });

  const closeAfter10 = () =>
    toast("Removed from Watchlist", { autoClose: 1000 });

  const page = `https://api.themoviedb.org/3/discover/movie?api_key=85e6c5e0fa4643b730fc19eb23518ce8&page=7`;
  const imgpath = `https://image.tmdb.org/t/p/w500`;

  useEffect(() => {
    apicall();
  }, []);

  const apicall = async () => {
    let response = await fetch(page);
    let resdata = await response.json();
    let data = resdata.results;
    setpopular(data);
  };

  const addfav = (e) => {
    let data = { movie: e, com: t };
    const temp = [...fav, data];
    setfav(temp);
    closeAfter15();

    let abc = popular.map((ele) => {
      if (ele.id === e.id) {
        return { ...ele, adult: !ele.adult };
      }
      return ele;
    });
    setpopular(abc);
  };

  const banner = (e) => {
    setid(e);
    console.log("id is", id);
    setshow(false);
  };

  const remove = (e) => {
    closeAfter10();
    let temp2 = fav.filter((ele) => e.id !== ele.movie.id);
    setfav(temp2);
    let abc = popular.map((ele) => {
      if (ele.id === e.id) {
        return { ...ele, adult: !ele.adult };
      }
      return ele;
    });
    setpopular(abc);
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
        <h1 className="title">Popular Movies</h1>
        <div className="container222">
          <Slider {...settings}>
            {popular.map((e) => (
              <div className="movie" key={e.id}>
                <img
                  src={`${imgpath}${e.poster_path}`}
                  onClick={() => banner(e.id)}
                  alt=""
                />
                {e.adult === true ? (
                  <button onClick={() => remove(e)}>Remove</button>
                ) : (
                  <button onClick={() => addfav(e)}>
                    <span>Watch Later</span> &nbsp; &nbsp;
                  </button>
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

export default Popular;
