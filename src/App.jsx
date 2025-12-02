import { SpeedInsights } from "@vercel/speed-insights/react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";

import StoreHoursSection from "./components/StoreHoursSection";
import storeHours from "./storeHours.json";

import BestSellingProducts from "./components/BestSellingProducts";
import products from "./product.json";

import DataImage from "./data";
import ServiceOptionsSection from "./components/ServiceOptionsSection";
import CategoriesPet from "./components/CategoriesPet";

import LogoLoop from "@/components/LogoLoop"; // pastikan alias @ sudah diset di vite.config.js
import companyLogosData from "./companyLogos.json";

const position = [-7.3617390992416585, 110.52008103236403];

const companyLogos = companyLogosData.map((item) => ({
  src: item.src,
  alt: item.title,
  title: item.title,
  href: item.href || null
}));

// Custom icon untuk marker peta
const petshopIcon = new L.Icon({
  iconUrl: "/assets/kucing.webp", // pastikan file ada di public/assets/kucing.webp
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Komponen untuk buka popup otomatis ketika map load
function AutoOpenPopup({ markerRef }) {
  const map = useMap();

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [map, markerRef]);

  return null;
}

function App() {
  const markerRef = useRef(null);

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-salem rounded-3xl">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero grid grid-cols-1 md:grid-cols-2 items-center pt-10 gap-6 xl:gap-0 rounded-2xl">
            {/* Kolom gambar */}
            <div className="order-1 md:order-none">
              <img
                src={DataImage.HeroImage}
                alt="Hero Image"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                className="w-full max-w-[560px] h-auto md:ml-auto mx-auto 
                     animate__animated animate__fadeInUp animate__delay-2s rounded-md"
              />
            </div>

            {/* Kolom teks */}
            <div className="animate__animated animate__fadeInUp animate__delay-1s">
              <div className="flex items-center gap-3 mb-6 bg-white text-salem p-4 rounded-2xl w-full md:w-fit">
                <q className="font-medium">MIR PET SHOP &amp; PAKAN TERNAK</q>
              </div>

              <h1 className="text-4xl md:text-5xl/tight font-bold mb-6 text-white">
                Karena Mereka Juga Butuh Disayang
              </h1>

              <p className="text-base leading-relaxed md:leading-8 mb-6 text-white/80">
                Apa pun hewan kesayangan Anda, MIR hadir dengan solusi pakan yang
                penuh cinta dan nutrisi. Karena kasih sayang bisa dimulai dari
                pakan yang tepat. #MIRsayangternak
              </p>

              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="https://maps.app.goo.gl/GZUAUaTMjaHao8NN8"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-salem px-5 py-3 rounded-2xl 
                       hover:bg-bermuda hover:text-white transition mb-10"
                >
                  Lihat Alamat <i className="ri-arrow-down-line ri-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END HERO */}

      {/* KATEGORI HEWAN */}
      <div className="kategori-pet py-10" id="kategori-pet">
        <CategoriesPet />
      </div>

      {/* JAM TOKO & PRODUK TERLARIS */}
      <div className="tentang py-10" id="tentang">
        <div className="tentang-box mt-14 grid lg:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-1">
          <div>
            <StoreHoursSection schedule={storeHours} />
          </div>
        </div>
        <div className="tools mt-32">
          <BestSellingProducts products={products} />
        </div>
      </div>

      {/* SERVICE OPTIONS */}
      <div className="tentang py-10" id="tentang">
        <ServiceOptionsSection />
      </div>

      {/* ALAMAT (MAP) */}
      <div className="proyek mt-32 py-10" id="proyek">
        <h1
          className="text-center text-4xl font-bold mb-2"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          Alamat Kami
        </h1>
        <p
          className="text-base/loose text-center opacity-50 mb-10"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
          data-aos-once="true"
        >
          Temukan kami di berbagai lokasi berikut
        </p>

        <div
          style={{ height: "400px", width: "100%" }}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
          data-aos-once="true"
        >
          <MapContainer center={position} zoom={16} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position} icon={petshopIcon} ref={markerRef}>
              <Popup>
                🐾 <b>MIR (Petshop &amp; Pakan Ternak)</b>
                <br />
                Sebelah Mr. Piss, Jl. Tingkir Raya No.Km 07, Tingkir Tengah, Kec. Tingkir, Kota
                Salatiga, Jawa Tengah 50745
                <br />
                <a
                  href="https://maps.app.goo.gl/EmHKnvp4FF49raCw7"
                  target="_blank"
                  rel="noreferrer"
                >
                  Buka di Google Maps
                </a>
              </Popup>
            </Marker>

            <AutoOpenPopup markerRef={markerRef} />
          </MapContainer>
        </div>
      </div>

      {/* BRAND LOGO LOOP */}
      <div className="kontak mt-32 sm:p-10 p-0" id="kontak">
        <h1
          className="text-4xl mb-2 font-bold text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          Brand Yang Kami Tawarkan
        </h1>
        <p
          className="text-base/loose text-center mb-10 opacity-50"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
          data-aos-once="true"
        >
          Berbagai merek pakan ternak dan hewan peliharaan berkualitas yang kami sediakan
        </p>

        <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
          {/* Horizontal loop */}
          <LogoLoop
            logos={companyLogos}
            speed={50}
            direction="left"
            logoHeight={75}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Brand pakan yang tersedia"
          />
        </div>
      </div>
      {/* END BRAND LOGO LOOP */}

      <SpeedInsights />
    </>
  );
}

export default App;
