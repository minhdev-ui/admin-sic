import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { Link } from "react-router-dom";
// import ban_hoc_tap from "../../"

const propTypes = {
  children: PropTypes.node,
  option: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};

const defaultProps = {
  children: null,
  option: {},
  name: "",
  label: "",
};

const Slide = ({ children, option, name, label, className }) => {
  option = {
    ...option,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          speed: 1000,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          speed: 1000,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          speed: 1000,
        },
      },
    ],
  };
  return (
    <div className="Ban-section">
      {label !== "" && <h2 className="Ban-section-header">{label}</h2>}
      <Slider {...option} className="Ban-section-slider">
        {children.map((item, i) => {
          return (
            <div key={i}>
              <Link to={item.href && item.href}>
                <div
                  style={{
                    background: `url("${item.theme}") top center/ cover no-repeat`,
                  }}
                  className="slide-item"
                >
                  <div className="overlay"></div>
                  <span className="slide-title">{item.title}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

Slide.prototype = propTypes;
Slide.defaultProps = defaultProps;

export default Slide;
