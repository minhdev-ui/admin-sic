import React, { useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import navLinks from "../../components/layout/partials/HeaderNav";
import Cta from "../../components/sections/Cta";
import Footer from "../../components/layout/Footer";
import Slider from "react-slick";
import './asset/style.scss';
import { MdOutlineDoubleArrow } from "react-icons/md";
import SignUpForm from "../../components/elements/SignUpForm";
import Circle from "../../components/elements/texture/Circle";
import Rectangle from "../../components/elements/texture/Rectangle";
import Polyline from "../../components/elements/texture/Polyline";
import Image from "../../components/elements/Image";
import icon01 from "../../assets/images/feature-tile-icon-01.svg";
import icon02 from "../../assets/images/feature-tile-icon-02.svg";
import Header from "../../components/layout/Header";

const propTypes = {
  children: Object,
  theme: String,
};

const defaultProps = {
  children: {},
  theme: "dark",
};
function TextureGroup() {
  return (
    <>
      <Circle rad={80} top={100} left={-34} ani="rushRight"></Circle>
      <Circle
        rad={30}
        top={300}
        right={150}
        fill="#f26031"
        ani="rushLeft"
      ></Circle>
      <Circle rad={60} top={80} right={50} fill="none"></Circle>
      <Rectangle
        fill="none"
        top={80}
        left={20}
        h={30}
        ani="rushLeft"
      ></Rectangle>
      <Polyline edge={60} top={108} left={-1}></Polyline>
      <Polyline edge={80} top={200} right={-2} ani="rushLeft"></Polyline>
    </>
  );
}

const Ban = ({ children, theme, className }) => {
  const opts = {
    dots: false,
    infinite: true,
    slideToShow: 1,
    slideToScroll: 1,
    nextArrow: (
      <div className="Ban-slides-next">
        <MdOutlineDoubleArrow />
      </div>
    ),
    prevArrow: (
      <div className="Ban-slides-previous">
        <MdOutlineDoubleArrow />
      </div>
    ),
  };
  const slider = useRef(null);
  const classes = classNames(`Ban_section Ban_section-${theme}`);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleSignUp = () => {
    setShowSignUpForm(!showSignUpForm);
  };
  return (
    <div className={className}>
      {showSignUpForm && <SignUpForm stateFunc={handleSignUp}></SignUpForm>}
      <section className={classes}>
        <Header
          navPosition="right"
          Nav={navLinks}
          className="Header-ban-pages"
        />
        <section className="Ban-main-content">
          <div className="f_layout">
            <div className="f_layout-f">
              <div className="f_layout-ff">
                <TextureGroup></TextureGroup>
                <h1 className="italic">
                  <span>{children.title}</span> {children.name}
                  <p className="uppercase">{children.clb}</p>
                </h1>
              </div>
              <div className="f_layout-fs">
                <div className="text_desc-ban">
                  <span>{children.registerMes}</span>
                </div>
                <div className="Ban-register-btn">
                  <button className="btn_desc-ban" onClick={handleSignUp}>
                    {children.btn}
                  </button>
                  <div className="shine"></div>
                </div>
              </div>
            </div>
            <div className="Ban-slides">
              <div className="Ban-slides-container">
                <Slider {...opts} ref={slider}>
                  {children.imagesIntro.map((item, i) => {
                    return (
                      <div className="Ban-slide-item" key={item}>
                        <img src={item} alt="" />
                      </div>
                    );
                  })}
                </Slider>
                <div className="Ban-slides-controls">
                  <div
                    className="Ban-slides-previous"
                    onClick={() => slider.current.slickPrev()}
                  >
                    <MdOutlineDoubleArrow />
                  </div>
                  <div
                    className="Ban-slides-next"
                    onClick={() => slider.current.slickNext()}
                  >
                    <MdOutlineDoubleArrow />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Slogan_page uppercase">
            <h1 className="h1-header-banpages">
              ''sinh viên giúp sinh viên làm chủ công nghệ''
            </h1>
          </div>
          <div className="Ban-mission">
            <Circle
              rad={30}
              top={300}
              right={150}
              fill="#f26031"
              ani="rushLeft"
            ></Circle>
            <h1 className="italic">Nhiệm vụ</h1>
            <div className="flex-Col">
              {children.mission.map((item) => (
                <div className="mission-item" key={item}>
                  <div className="icon">
                    <Image src={icon02} alt="Mission" width={64} height={64} />
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="Ban-advantages">
            <TextureGroup></TextureGroup>
            <Circle
              rad={30}
              top={200}
              left={300}
              fill="none"
              ani="rushRight"
            ></Circle>
            <h1 className="italic">Lợi ích khi tham gia</h1>
            <div className="flex-Col">
              {children.advantage.map((item) => (
                <div className="advantage-item" key={item}>
                  <div className="icon">
                    <Image
                      src={icon01}
                      alt="Advantage"
                      width={64}
                      height={64}
                    />
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Cta />
        <Footer />
      </section>
    </div>
  );
};

Ban.prototype = propTypes;
Ban.defaultProps = defaultProps;

export default Ban;
