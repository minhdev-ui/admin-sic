import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import HuyNguyen from "./../../assets/images/BanChuNhiem/HuyNguyen.jpeg";
import NgocHa from "./../../assets/images/BanChuNhiem/NgocHa.png";
import TuanAnh from "./../../assets/images/BanChuNhiem/TuanAnh.png";
import "./../../assets/css/style.css";
import { FaFacebook } from "react-icons/fa";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const Testimonial = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    "testimonial section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "testimonial-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

  const sectionHeader = {
    title: "Thành viên ban chủ nhiệm",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            <div
              className="tiles-item reveal-from-right"
              data-reveal-delay="200"
            >
              <div className="tiles-item-inner">
                <span className="my-team-name">
                  <Image
                    src={HuyNguyen}
                    alt="Features split 01"
                    width={120}
                    height={120}
                    className="my-team-images"
                  />
                  <h4>Phan Huy Nguyên</h4>
                  <p>Phó chủ nhiệm</p>
                </span>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-link">
                    <div className="fb-icon">
                      <a
                        href="https://www.facebook.com/huynguyen.990"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook className="fb-icon" />
                      </a>
                    </div>
                  </span>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <span className="my-team-name">
                  <Image
                    src={TuanAnh}
                    alt="Features split 01"
                    width={120}
                    height={120}
                    className="my-team-images"
                  />
                  <h4>Phạm Tuấn Anh</h4>
                  <p>Chủ nhiệm</p>
                </span>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-link">
                    <div className="fb-icon">
                      <a
                        href="https://www.facebook.com/pn.tuanannh"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook className="fb-icon" />
                      </a>
                    </div>
                  </span>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-left"
              data-reveal-delay="200"
            >
              <div className="tiles-item-inner">
                <span className="my-team-name">
                  <Image
                    src={NgocHa}
                    alt="Features split 01"
                    width={120}
                    height={120}
                    className="my-team-images"
                  />
                  <h4>Đới Thị Ngọc Hà</h4>
                  <p>Phó chủ nhiệm</p>
                </span>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-link">
                    <div className="fb-icon">
                      <a
                        href="https://www.facebook.com/ngha219"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook className="fb-icon" />
                      </a>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;
