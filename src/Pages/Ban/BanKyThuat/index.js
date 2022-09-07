import { useState } from "react";
import Ban from "../index";
import banKyThuat from "./bankythuat";

const BanKyThuat = () => {
  const [scroll, setScroll] = useState(false);
  window.addEventListener("scroll", () => {
    window.pageYOffset >= 100 ? setScroll(true) : setScroll(false);
  });
  return (
    <>
      <Ban children={banKyThuat} scroll={scroll} />
    </>
  );
};

export default BanKyThuat;
