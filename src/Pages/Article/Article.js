import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import navLinks from "../../components/layout/partials/HeaderNav";
import Cta from "../../components/sections/Cta";
// import db from "../../db.config";
import axios from "axios";
import config from "../../db.config";
import Loading from "../../utils/Loading";

// FOR BLOG AND EVENT PAGE

const Article = ({ type, title }) => {
  const [data, setData] = useState([]);
  const [ loading, setLoading ] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios.get(`${config.API_URL}/api/article`, {params: {categorize: type}}).then((res) => {
      setLoading(false)
      setData(res.data)
    })
  }, [type]);

  // Search
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  //

  const classes = classNames(`Article_section`);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slideToShow: 1,
    slideToScroll: 1,
  };
  const slider = useRef(null);
  return (
    <Loading loading={loading}>
      <div>
        <section className={classes}>
          <Header
            navPosition="right"
            Nav={navLinks}
            className="Header-article-pages"
          />
          <section className="article-main-content">
            <div className="container">
              <h2 className="text-center">{title}</h2>
              <Slider {...settings} ref={slider}>
                {data && data.length > 0
                  ? data?.map((item) => (
                      <div className="article-slider" key={item.id}>
                        <img src={item.image} alt="" />
                        <div className="slider-content">
                          <h2>{item.title}</h2>
                          <p>{item.shortDes}</p>

                          <Link
                            className="button button-primary button-sm"
                            to={() => `/${type}/${item._id}`}
                          >
                            Xem thêm
                          </Link>
                        </div>
                      </div>
                    ))
                  : ""}
              </Slider>
              <div className="slider-controls">
                <div
                  className="slides-previous"
                  onClick={() => slider.current.slickPrev()}
                >
                  <MdOutlineDoubleArrow />
                </div>
                <div
                  className="slides-next"
                  onClick={() => slider.current.slickNext()}
                >
                  <MdOutlineDoubleArrow />
                </div>
              </div>
              <div className="search-form">
                <form action="">
                  <input
                    className="input-search"
                    type="text"
                    placeholder="Tìm kiếm..."
                    onChange={handleSearch}
                  />
                  <button type="button" className="search-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 512 512"
                    >
                      <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
                    </svg>
                  </button>
                </form>
              </div>
              <div className="article-lists">
                {data && data.length > 0
                  ? data
                      .filter((value) => {
                        if (searchValue === "") {
                          return value;
                        } else if (
                          value.title
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                        ) {
                          return value;
                        }
                      })
                      .map((article) => (
                        <div className="article-item" key={article.id}>
                          <div className="container">
                            <div className="article-main-img">
                              <img src={article.image} alt="" />
                            </div>
                            <div className="article-main-content">
                              <h4 className="article-title">{article.title}</h4>
                              <span className="article-time">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z" />
                                </svg>
                                {/* <p>
                                  {handleChangeSeconsToDate(
                                    article.createdAt.seconds
                                  )}
                                </p> */}
                              </span>
                              <p className="article-overview">
                                {article.shortDes}
                              </p>
                            </div>
                            <div className="see-detail">
                              <Link
                                className="see-detail-btn"
                                to={() => `/${type}/${article._id}`}
                              >
                                Xem thêm
                              </Link>
                            </div>
                          </div>
                        </div>
                      )).reverse()
                  : ""}
              </div>
              {/* 
                <div className="load-more-btn">
                  <button type="button" onClick={() => loadMore()}>
                    Tải thêm
                  </button>
                </div>
              ) 
              )} */}
            </div>
          </section>
          <Cta center />
          <Footer />
        </section>
      </div>
    </Loading>
  );
};

export default Article;
