import React from "react";
import { Markup } from "interweave"; // for converting string to html

const DetailArticle = ({ post }) => {
  return (
    <div>
      <h4 className="title" style={{color: '#000', fontSize: '40px'}}>{post.title}</h4>
      <img
        src={post.image}
        alt=""
        width={"100%"}
        style={{
          padding: "20px 0",
        }}
      />
      <Markup content={post.text} className="text" />
      <div className="tags">
        <div className="article-tags">
          <span className="article-item primary">TAGS</span>
          {post.tags && post.tags.length > 0
            ? post.tags.map((tag) => (
                <span className="article-item" key={tag}>
                  {tag}
                </span>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default DetailArticle;
