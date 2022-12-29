import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import nodataFound from "./nothing-found.png";
function App() {
  const [InputValue, setInputValue] = useState("");
  const [ApiData, setApiData] = useState([]);
  const [Apilen, setApilen] = useState();
  const [apitotal, setApitotal] = useState();
  const [lastVisiblePage, setlastVisiblePage] = useState(0);

  const [pageLimit, setpageLimit] = useState(0);
  const [count, setcount] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.jikan.moe/v4/characters?page=${pageLimit}&limit=15&q=${InputValue}&order_by=favorites&sort=desc`
      )
      .then((resp) => {
        setApiData(resp.data.data);
        setApilen(resp.data.pagination.has_next_page);
        setApitotal(resp.data.pagination.items.total);
        setlastVisiblePage(resp.data.pagination.last_visible_page);
      });
  }, [InputValue, pageLimit]);

  const nextFun = () => {
    setpageLimit(pageLimit + 1);
    setcount(count + 15);
  };
  const prevFun = () => {
    setpageLimit(pageLimit - 1);
    setcount(count - 15);
  };

  return (
    <div className="App anime_background bg-white">
      <div className="container ">
        <h4 className="text-center mt-4">Search Anime Characters</h4>

        <div className="input-group input_area mb-4 border rounded-pill p-1">
          <div className="input-group-prepend border-0">
            <button
              id="button-addon4"
              type="button"
              className="btn btn-link text-info"
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
          <input
            type="search"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="Search anime characters"
            aria-describedby="button-addon4"
            className="form-control bg-none border-0 input_class text-center"
          />
        </div>
        <h5 className="text-center">
          Total {apitotal} {InputValue.length > 0 ? "matching" : ""} anime
          characters {InputValue.length > 0 ? "Found" : "are there"}
        </h5>
        {ApiData.length > 0 ? (
          <div className="cardCompo">
            {ApiData.map((data, key) => {
              return (
                <div
                  key={key}
                  className="main_div  d-flex justify-content-between p-1 mt-2"
                >
                  <div className="left_div d-flex justify-content-start align-items-center">
                    <div className="image_wrap">
                      <img src={data.images.jpg.image_url} alt="" />
                    </div>
                    <div className="content_wrap mx-4 mt-4 d-flex flex-column align-items-start text-start">
                      <h4 className="text-start mt-3">{data.name}</h4>
                      <div className="nick_names d-flex  flex-wrap">
                        {data.nicknames
                          ? data.nicknames.map((d, k) => {
                              return (
                                <span
                                  key={k}
                                  className="badge mx-1 mt-2 text-center rounded-pill text-bg-primary"
                                >
                                  {d}
                                </span>
                              );
                            })
                          : ""}
                      </div>
                      <p className="card-text mt-3 mb-4">{data.about}</p>
                    </div>
                  </div>

                  <div className="right_div d-flex ">
                    <div className="favourites ">
                      <div>
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: "red" }}
                        ></i>
                      </div>

                      <span className="mx-2">{data.favorites}</span>
                    </div>
                    <a href={data.url} className="navigation_anchor">
                      <div className="navigation mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="currentColor"
                          className="bi bi-arrow-right"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no_data d-flex justify-content-center align-items-center ">
            <h4>
              No data Found
              <img src={nodataFound} alt="" />
            </h4>
          </div>
        )}
        <nav aria-label="pagination_nav">
          <ul className="pagination pagination_nav mt-2">
            <li className="page-item ">
              <button
                className="btn btn-primary mx-4"
                disabled={pageLimit == 0 ? true : false}
                onClick={prevFun}
              >
                Previous
              </button>
            </li>

            <li className="page-item">
              <button
                className="btn btn-primary"
                disabled={!Apilen}
                onClick={nextFun}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
