import React from "react";
import Slide from "../elements/Slider";
import ban_hoc_tap from "../../assets/images/ban-preview/ban_hoc_tap.svg"
import ban_ho_tro from "../../assets/images/ban-preview/ban_ho_tro.svg"
import ban_ky_thuat from "../../assets/images/ban-preview/ban_ky_thuat.svg"
import ban_truyen_thong from "../../assets/images/ban-preview/ban_truyen_thong.svg"

const Ban = () => {
  const options = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const Bans = [
    { title: "Ban Kỹ Thuật", theme: ban_ky_thuat, href: "/ban-ky-thuat" },
    { title: "Ban Truyền Thông", theme: ban_truyen_thong, href: "/ban-truyen-thong" },
    { title: "Ban Hỗ Trợ", theme: ban_ho_tro, href: "/ban-ho-tro" },
    { title: "Ban Học Tập", theme: ban_hoc_tap, href: "/ban-hoc-tap"},
  ];
  return (
    <div className="container">
      <Slide
        children={Bans}
        option={options}
        style={{ textAlign: "left", marginBottom: "30px", marginLeft: "0" }}
        label="Các Ban Trong SIC"
      />
    </div>
  );
};

export default Ban;
