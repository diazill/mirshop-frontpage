import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Preloader from "./components/Preloader.jsx";
import WhatsAppWidget from "./components/WhatsAppWidget.jsx";

import "remixicon/fonts/remixicon.css";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "leaflet/dist/leaflet.css";

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    const timer = setTimeout(() => {
      setIsLoading(false);
      AOS.refresh(); // pastikan posisi animasi di-update
    }, 500); // bisa 500–1000 ms biar gak berasa lama

    return () => clearTimeout(timer);
  }, []);

  return (
    <StrictMode>
      <div className="relative">
        {/* overlay preloader */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <Preloader />
          </div>
        )}

        {/* konten utama selalu ke-render (AOS jalan dari awal) */}
        <div className="container mx-auto 2xl:px-12 sm:px-2 px-0">
          <Navbar />
          <App />
          <Footer />
          {!isLoading && <WhatsAppWidget />}
        </div>
      </div>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
