import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import "./../../assets/css/style.css";
import "react-slideshow-image/dist/styles.css";
import { Zoom, Slide } from "react-slideshow-image";
import events from "./event/ImagesData";

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "Các sự kiện tiêu biểu",
  };

  const properties = {
    duration: 5000,
    autoplay: true,
    transitionDuration: 500,
    arrows: true,
    infinite: true,
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            {events.map((e, index) => {
              return (
                <div className="split-item" key={index}>
                  <div
                    className="split-item-content center-content-mobile reveal-from-left"
                    data-reveal-container=".split-item"
                  >
                    <h3 className="mt-0 mb-12">{e.title}</h3>
                    <p className="m-0">{e.desc}</p>
                  </div>
                  <div
                    className={classNames(
                      "split-item-image center-content-mobile reveal-from-bottom",
                      imageFill && "split-item-image-fill"
                    )}
                    data-reveal-container=".split-item"
                  >
                    <div
                      className={
                        index % 2 === 0
                          ? "slide-container"
                          : "slide-container-left"
                      }
                    >
                      <Slide {...properties}>
                        {e.images.map((each, index) => (
                          <div key={index} className="each-slide">
                            <img className="lazy" src={each} alt="sample" />
                          </div>
                        ))}
                      </Slide>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
