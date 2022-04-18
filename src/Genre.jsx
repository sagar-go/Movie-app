import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "./Context";
import Id from "./Id";
import Random from "./Random";
import { ToastContainer, toast } from "react-toastify";

function Genre() {
  const { gen, setgen, temp, fil, setfil } = useContext(MainContext);
  const {
    t,
    fav,
    setfav,
    setmovieid,
    id,
    setid,
    settemp,
    videoId,
    setvideoId,
    name,
    setname,
    setshow,
  } = useContext(MainContext);
  const [fil2, setfil2] = useState([]);
  console.log("genre", gen);
  const [res1, setres1] = useState([]);
  const [res2, setres2] = useState([]);
  const [res3, setres3] = useState([]);
  const [temp2, settemp2] = useState([]);

  const closeAfter15 = () =>
    toast("Movie added to Watchlist", { autoClose: 1000 });

  const imgpath = `https://image.tmdb.org/t/p/w500`;
  const apiid = `https://api.themoviedb.org/3/movie//${id}?api_key=85e6c5e0fa4643b730fc19eb23518ce8`;

  const page = `https://api.themoviedb.org/3/discover/movie?api_key=85e6c5e0fa4643b730fc19eb23518ce8&page=3`;
  const page2 = `https://api.themoviedb.org/3/discover/movie?api_key=85e6c5e0fa4643b730fc19eb23518ce8&page=4`;
  const page3 = `https://api.themoviedb.org/3/discover/movie?api_key=85e6c5e0fa4643b730fc19eb23518ce8&page=5`;

  let api = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${name}trailer&maxResults=1&key=AIzaSyAT30cbRBNY_R-quJ2I2WTnByDUBQkRCfw`;

  useEffect(() => {
    videocall();
    return videocall();
  }, [name]);

  const videocall = async () => {
    const resp = await fetch(api);
    const data = await resp.json();
    setvideoId([data.items[0].id.videoId]);
  };

  useEffect(() => {
    apicall();
    apicall2();
    apicall3();
  }, []);

  const apicall = async () => {
    let response = await fetch(page);
    let resdata = await response.json();
    let data = resdata.results;
    setres1(data);
    setfil(data);

    setname(resdata.title);
  };

  const apicall2 = async () => {
    let response = await fetch(page2);
    let resdata = await response.json();
    let data = resdata.results;
    setres2(data);
    setname(resdata.title);
  };
  const apicall3 = async () => {
    let response = await fetch(page3);
    let resdata = await response.json();
    let data = resdata.results;
    setres3(data);
    setname(resdata.title);
  };
  useEffect(() => {
    idcall3();
  }, [id]);

  const idcall3 = async () => {
    let response = await fetch(apiid);
    let resdata = await response.json();
    setmovieid([resdata]);
    setname(resdata.title);
  };

  useEffect(() => {
    let arr = temp2.concat(res1, res2, res3);
    let result = arr;
    if (gen === 0) {
      setfil2(result);
      return;
    }
    const temp = result.filter((e) => e.genre_ids.includes(gen));
    setfil2(temp);
  }, [gen]);

  const addfav = (e) => {
    let data = { movie: e, com: t };
    const temp2 = [...fav, data];
    setfav(temp2);
    closeAfter15();
  };

  const remove = (e) => {
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

  const banner = (e) => {
    setid(e.id);
    console.log("id is banner", id);
    setshow(false);
  };

  console.log("fil", fil);
  console.log("fil2", fil2);

  if (gen === 0) {
    return (
      <>
        {id === 316256 || id === null ? <Random /> : <Id />}

        <div className="filbuttons">
          <button
            className={gen === 0 ? "active" : "notactive"}
            onClick={() => setgen(0)}
          >
            All
          </button>
          <button
            className={gen === 80 ? "active" : "notactive"}
            onClick={() => setgen(80)}
          >
            Crime
          </button>
          <button
            className={gen === 35 ? "active" : "notactive"}
            onClick={() => setgen(35)}
          >
            Comedy
          </button>
          <button
            className={gen === 878 ? "active" : "notactive"}
            onClick={() => setgen(878)}
          >
            Science Fiction
          </button>
          <button
            className={gen === 27 ? "active" : "notactive"}
            onClick={() => setgen(27)}
          >
            Horror
          </button>
        </div>
        <div className="con3">
          {fil.map((e) => (
            <div className="con3aa">
              <img
                src={`${imgpath}${e.poster_path}`}
                onClick={() => banner(e)}
                alt=""
              />
              {e.adult === true ? (
                <button onClick={() => remove(e)}>Remove</button>
              ) : (
                <button onClick={() => addfav(e)}>Add</button>
              )}
            </div>
          ))}
        </div>
        <ToastContainer />
      </>
    );
  }

  return (
    <div>
      {id === 316256 || id === null ? <Random /> : <Id />}
      <div className="filbuttons">
        <button
          className={gen === 0 ? "active" : "notactive"}
          onClick={() => setgen(0)}
        >
          All
        </button>
        <button
          className={gen === 80 ? "active" : "notactive"}
          onClick={() => setgen(80)}
        >
          Crime
        </button>
        <button
          className={gen === 35 ? "active" : "notactive"}
          onClick={() => setgen(35)}
        >
          Comedy
        </button>
        <button
          className={gen === 878 ? "active" : "notactive"}
          onClick={() => setgen(878)}
        >
          Science Fiction
        </button>
        <button
          className={gen === 27 ? "active" : "notactive"}
          onClick={() => setgen(27)}
        >
          Horror
        </button>
      </div>

      <div className="con3">
        {fil2.map((e, idx) => (
          <div className="con3aa">
            <img
              src={`${imgpath}${e.poster_path}`}
              onClick={() => banner(e)}
              alt=""
            />
            {e.adult === true ? (
              <button onClick={() => remove(e)}>Remove</button>
            ) : (
              <button onClick={() => addfav(e)}>Add</button>
            )}
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Genre;
