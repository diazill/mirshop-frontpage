import { SpeedInsights } from "@vercel/speed-insights/react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import StoreHoursSection from "./components/StoreHoursSection";
import storeHours from "./storeHours.json";
import BestSellingProducts from "./components/BestSellingProducts";
import products from "./product.json";
import DataImage from "./data";
import WhatsAppWidget from "./components/WhatsAppWidget";

const position = [-7.3617390992416585, 110.52008103236403]

// Custom icon (contoh: paw 🐾)
const petshopIcon = new L.Icon({
  iconUrl: "/assets/kucing.webp", // bisa pakai icon custom
  iconSize: [40, 40], // ukuran icon
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Komponen untuk buka popup otomatis
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
  const markerRef = useRef();
  return (
    <>
      <section className="bg-salem rounded-3xl">
        {/* container + padding responsif */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero grid grid-cols-1 md:grid-cols-2 items-center pt-10 gap-6 xl:gap-0 rounded-2xl">

            {/* Kolom gambar */}
            <div className="order-1 md:order-none">
              <img
                src={DataImage.HeroImage}
                alt="Hero Image"
                loading="lazy"
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
                Apa pun hewan kesayangan Anda, MIR hadir dengan solusi pakan yang penuh cinta
                dan nutrisi. Karena kasih sayang bisa dimulai dari pakan yang tepat. #MIRsayangternak
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

      {/* End Hero section */}

      {/* Start tentang section */}
      <div className="tentang mt-32 py-10" id="tentang">
        <div className="tentang-box mt-14 grid lg:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-1">
          <div><StoreHoursSection schedule={storeHours} />
          </div>
        </div>
        <div className="tools mt-32">
          <BestSellingProducts products={products} />
        </div>
      </div>
      {/* end tentang section */}

      {/* Start Alamat section */}
      <div className="proyek mt-32  py-10" id="proyek">
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
        <div style={{ height: "400px", width: "100%" }}>
          <MapContainer
            center={position}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position} icon={petshopIcon} ref={markerRef}>
              <Popup>
                🐾 <b>MIR (Petshop & Pakan Ternak)</b>
                <br />
                Sebelah Mr. Piss, Jl. Tingkir Raya No.Km 07, Tingkir Tengah, Kec. Tingkir, Kota Salatiga, Jawa Tengah 50745 <br />
                <a
                  href={`https://maps.app.goo.gl/EmHKnvp4FF49raCw7`}
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
      {/* end proyek section */}

      {/* start kontak section */}
      <div className="kontak mt-32 sm:p-10 p-0" id="kontak">
        <h1
          className="text-4xl mb-2 font-bold text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          Kontak
        </h1>
        <p
          className="text-base/loose text-center mb-10 opacity-50"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
          data-aos-once="true"
        >
          Mari terhubung dengan saya
        </p>
        <form
          action="https://formsubmit.co/diaz.illyasa1006@gmail.com"
          method="POST"
          className="bg-zinc-800 p-10 sm:w-fit w-full mx-auto rounded-md"
          autoComplete="off"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
          data-aos-once="true"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                placeholder="Masukan Nama.."
                className="border border-zinc-500 p-2 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Masukan Email.."
                className="border border-zinc-500 p-2 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="pesan" className="font-semibold">
                Pesan
              </label>
              <textarea
                name="pesan"
                id="pesan"
                cols="45"
                rows="7"
                placeholder="Pesan ..."
                className="border border-zinc-500 p-2 rounded-md"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-violet-700 p-3 rounded-lg w-full cursor-pointer border border-zinc-600 hover:bg-violet-600"
              >
                Kirim Pesan
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* end kontak section */}
      <SpeedInsights />
    </>
  );
}

export default App;
