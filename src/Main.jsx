import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "./Context";
import Fav from "./Fav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Id from "./Id";
import Random from "./Random";
import Slider from "react-slick";
import Result from "./Result";
import Trending from "./Trending";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Genre from "./Genre";
import Popular from "./Popular";

function Main() {
  const {
    setrandom,
    t,
    fav,
    setfav,
    setmovieid,
    sub,
    setshow,
    setresult,
    id,
    name,
    setname,
    setid,
    trend,
  } = useContext(MainContext);
  let [mapped, setmap] = useState([]);
  let [nn, setnn] = useState(false);
  let [temp, settemp] = useState([]);

  let api =
    "https://api.themoviedb.org/3/discover/movie?api_key=85e6c5e0fa4643b730fc19eb23518ce8";

  const imgpath = `https://image.tmdb.org/t/p/w500`;
  let example = `https://api.themoviedb.org/3/search/movie?api_key=85e6c5e0fa4643b730fc19eb23518ce8&query=${sub}`;
  const page = `https://api.themoviedb.org/3/discover/movie?api_key=85e6c5e0fa4643b730fc19eb23518ce8&page=40`;
  const apiid = `https://api.themoviedb.org/3/movie//${id}?api_key=85e6c5e0fa4643b730fc19eb23518ce8`;

  useEffect(() => {
    apicall();
  }, []);
  useEffect(() => {
    apicall2();
  }, [sub]);

  useEffect(() => {
    apicall3();
  }, [id]);

  const closeAfter15 = () =>
    toast("Movie added to Watchlist", { autoClose: 1000 });
  const closeAfter10 = () =>
    toast("Removed from Watchlist", { autoClose: 1000 });

  const savelocal = (items) => {
    localStorage.setItem("movie-app", JSON.stringify(items));
  };
  // movie.map(obj=> ({ ...obj, Active: false }));

  const apicall = async () => {
    let response = await fetch(api);
    let resdata = await response.json();
    let data = resdata.results;
    // setmovie(data);
    console.log(data);
    setrandom([data[Math.floor(Math.random() * 20)]]);
    settemp(data);
  };

  const apicall2 = async () => {
    let response = await fetch(example);
    let resdata = await response.json();
    let data = resdata.results;
    setresult(data);
    // setfil(data);
  };

  const apicall3 = async () => {
    let response = await fetch(apiid);
    let resdata = await response.json();
    setmovieid([resdata]);
    setname(resdata.title);
  };
  console.log("name is", name);

  const addfav = (e) => {
    let data = { movie: e, com: t };
    const temp2 = [...fav, data];
    setfav(temp2);
    let abc = temp.map((ele) => {
      if (ele.id === e.id) {
        return { ...ele, adult: !ele.adult };
      }
      return ele;
    });
    settemp(abc);
    closeAfter15();
  };

  const banner = (e) => {
    setid(e);
    setshow(false);
  };

  const remove = (e) => {
    closeAfter10();
    let temp2 = fav.filter((ele) => e.id !== ele.movie.id);
    setfav(temp2);
    let abc = temp.map((ele) => {
      if (ele.id === e.id) {
        return { ...ele, adult: !ele.adult };
      }
      return ele;
    });
    settemp(abc);
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
      {id === 316256 || id === null ? <Random /> : <Id />}
      {sub === "z" || sub === "" ? "" : <Result />}
      <div className="theme">
        <Popular />
        <div className="head">
          <h1 className="title">Top Rated</h1>
          <div className="container222">
            <Slider {...settings}>
              {temp.map((e) => (
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
                    <button onClick={() => addfav(e)}>Watch later</button>
                  )}
                </div>
              ))}
            </Slider>
            <ToastContainer></ToastContainer>
          </div>
        </div>

        <Trending />
      </div>
    </>
  );
}

export default Main;
