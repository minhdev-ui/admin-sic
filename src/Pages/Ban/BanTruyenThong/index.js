import { useState } from "react";
import Ban from "../index";
import banTruyenThong from "./bantruyenthong";

const BanTruyenThong = () => {
  const [scroll, setScroll] = useState(false);
  window.addEventListener("scroll", () => {
    window.pageYOffset >= 100 ? setScroll(true) : setScroll(false);
  });
  return (
    <>
      <Ban children={banTruyenThong} scroll={scroll} />
    </>
  );
};

export default BanTruyenThong;
