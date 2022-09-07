import React from "react";
// import PropTypes from "prop-types";
import Slider from "react-slick";
import ICDLlogo from "../../assets/images/DoiTac/ICDLlogo.png";
import BITlogo from "../../assets/images/DoiTac/BITlogo.jpg";
import AZlogo from "../../assets/images/DoiTac/logo_laptopaz.jpg";

const coop = [
  { name: "ICDL", logo: ICDLlogo },
  { name: "CLB Tin Học Ngân Hàng", logo: BITlogo },
  { name: "LapTop AZ", logo: AZlogo },
  { name: "ICDL", logo: ICDLlogo },
  { name: "CLB Tin Học Ngân Hàng", logo: BITlogo },
  { name: "LapTop AZ", logo: AZlogo },
];

const Cooperator = () => {
  const title = "Đối Tác Của SIC";
  const opts = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  // }
  return (
    <section className="coop-section">
      <h2 className="coop-title">{title}</h2>
      <Slider {...opts}>
        {coop.map((item, index) => (
          <div key={index} className="coop-slide">
            <div className="coop-img">
              <img alt="" className="coop-images" src={item.logo} />
            </div>
            <span className="coop-name">{item.name}</span>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Cooperator;
