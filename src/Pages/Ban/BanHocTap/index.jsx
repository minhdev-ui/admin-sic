import { useState } from 'react';
import Ban from '../index';
import banHocTap from './banhoctap';

const BanHocTap = () => {
    const [scroll, setScroll] = useState(false);
    window.addEventListener("scroll", () => {
        window.pageYOffset >= 100 ? setScroll(true) : setScroll(false);
      });
    return (
        <>
            <Ban children={banHocTap} scroll={scroll}/>
        </>
    )
}

export default BanHocTap
