/* eslint-disable react/jsx-no-target-blank */
import { Markup } from "interweave"; // for converting string to html
import React, { useEffect, useState } from "react";
import { BsFillCalendarFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Comment, LikeAndShare } from "../../assets/facebook/Facebook";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import navLinks from "../../components/layout/partials/HeaderNav";
import Cta from "../../components/sections/Cta";
// import db from "../../db.config";
import axios from "axios";
import config from "../../db.config";
import { handleChangeSeconsToDate } from "../../utils/ConvertSecondToDate";
import Loading from "../../utils/Loading";
import { Skeleton } from "antd";
const ArticleDetail = ({ type }) => {
  const { postID } = useParams();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`${config.API_URL}/api/article/${postID}`).then((res) => {
      setLoading(false);
      setData(res.data);
    });
  }, [postID, type]);
  console.log(data)
  const { title, image, text, tags, createdAt, author } = data;
  const urlPost = `https://dev-web-sic.vercel.app/${type}/${postID} `;


  return (
    <>
      <Header
        navPosition="right"
        Nav={navLinks}
        className="Header-ban-pages"
      ></Header>
      {loading ? (
        <>
          <Skeleton active loading={loading}/>
          <Skeleton paragraph={{rows: 20}} active loading={loading}/>
          <Skeleton paragraph={{rows: 20}} active loading={loading}/>
        </>
      ) : (
        <div className="article container">
          <h2>{title}</h2>
          <div className="grid-3">
            <div className="article-left">
              <img src={image} alt="" />
              <p>
                <Markup content={text} />
              </p>
              {tags && (
                <div className="article-tags">
                  <span className="article-item primary">TAGS</span>
                  {tags.map((tag) => (
                    <span className="article-item" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <LikeAndShare url={urlPost}></LikeAndShare>
              <div className="form-comment">
                <Comment url={urlPost}></Comment>
              </div>
            </div>
            <div className="article-right">
              <div className="article-info">
                <div className="article-item primary">
                  <BsFillCalendarFill></BsFillCalendarFill>
                </div>
                {createdAt ? handleChangeSeconsToDate(createdAt.seconds) : ""}
              </div>
              <div className="article-info">
                <div className="article-item primary">
                  <FaUser></FaUser>
                </div>
                {author}
              </div>
              <hr />
            </div>
          </div>
        </div>
      )}
      <Cta center />
      <Footer />
    </>
  );
};

export default ArticleDetail;
