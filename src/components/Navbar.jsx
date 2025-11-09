import { useState, useEffect } from "react";
import DataImage from "../data";

const Navbar = () => {
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.3; // muncul setelah ~2/3 layar discroll
      setShowFloating(window.scrollY > threshold);
    };

    handleScroll(); // cek posisi awal
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative z-[40]">
      {/* bar atas (logo + nav versi desktop) */}
      <div className="navbar py-7 flex items-center justify-between">
        <div className="logo">
          <img
            src={DataImage.LogoImage}
            alt="Logo MIR"
            className="w-full md:ml-auto animate__animated animate__fadeInLeft animate__delay-2s rounded-md"
            loading="lazy"
          />
        </div>

        {/* navbar versi desktop → selalu kelihatan */}
        <nav className="hidden md:block animate__animated animate__fadeInRight animate__delay-2s">
          <ul className="flex gap-10 items-center text-base font-medium">
            <li><a href="#beranda" className="sm:text-lg text-base font-medium">Beranda</a></li>
            <li><a href="#tentang" className="sm:text-lg text-base font-medium">Produk</a></li>
            <li><a href="#proyek" className="sm:text-lg text-base font-medium">Tentang Kami</a></li>
            <li><a href="#" className="sm:text-lg text-base font-medium">Brand</a></li>
            <li><a href="#kontak" className="sm:text-lg text-base font-medium">Kontak</a></li>
          </ul>
        </nav>
      </div>

      {/* navbar “pill” mengambang versi mobile */}
      <nav
        className={`
          md:hidden
          fixed left-1/2 -translate-x-1/2
          w-[92vw] max-w-xl
          bg-[#b7e0c0] text-green-900
          rounded-b-2xl
          shadow-md
          z-[40]
          transition-all duration-300
          ${showFloating ? "top-0 opacity-100" : "-top-20 opacity-0 pointer-events-none"}
        `}
      >
        <ul className="flex justify-between gap-4 px-6 py-3 text-sm font-medium">
          <li><a href="#beranda" className="sm:text-lg text-base font-medium">Beranda</a></li>
          <li><a href="#tentang" className="sm:text-lg text-base font-medium">Produk</a></li>
          <li><a href="#proyek" className="sm:text-lg text-base font-medium">Tentang Kami</a></li>
          <li><a href="#" className="sm:text-lg text-base font-medium">Brand</a></li>
          <li><a href="#kontak" className="sm:text-lg text-base font-medium">Kontak</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
