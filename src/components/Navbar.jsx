import { useState, useEffect } from "react";
import DataImage from "../data";

const Navbar = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="navbar py-7 flex  items-center justify-between">
      <div className="logo">
        <img
          src={DataImage.LogoImage}
          alt="Hero Image"
          className="w-full md:ml-auto animate__animated
          animate__fadeInUp
          animate__delay-2s  rounded-md"
          loading="lazy"
        />
      </div>
      <div
        className="animate__animated
          animate__fadeInRight
          animate__delay-2s"
      >
        <ul
          className={`menu flex sm:gap-10 gap-4 items-center md:static fixed
              left-1/2 -translate-x-1/2 md:translate-x-0
              md:opacity-100 bg-white/30 backdrop-blur-md p-4
              rounded-br-2xl rounded-bl-2xl md:bg-transparent transition-all  md:transition-none z-40
              ${active ? "top-0 opacity-100" : "-top-10 opacity-0"}`}
        >
          <li>
            <a href="#beranda" className="sm:text-lg text-base font-medium">
              Beranda
            </a>
          </li>
          <li>
            <a href="#tentang" className="sm:text-lg text-base font-medium">
              Tentang
            </a>
          </li>
          <li>
            <a href="#proyek" className="sm:text-lg text-base font-medium">
              Alamat
            </a>
          </li>
          <li>
            <a href="#" className="sm:text-lg text-base font-medium">
              Brand
            </a>
          </li>
          <li>
            <a href="#kontak" className="sm:text-lg text-base font-medium">
              Kontak Kami
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
