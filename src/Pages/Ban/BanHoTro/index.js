import { useState } from "react";
import Ban from "../index";
import banHoTro from "./banhotro";

const BanHoTro = () => {
  const [scroll, setScroll] = useState(false);
  window.addEventListener("scroll", () => {
    window.pageYOffset >= 100 ? setScroll(true) : setScroll(false);
  });
  return (
    <>
      <Ban children={banHoTro} scroll={scroll} />
    </>
  );
};

export default BanHoTro;
