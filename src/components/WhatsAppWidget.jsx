// src/components/WhatsAppWidget.jsx
import React, { useEffect, useState } from "react";
import "animate.css";

export default function WhatsAppWidget() {
    const [isHiding, setIsHiding] = useState(false);

    // cuma yang hilang bubble-nya, tombol tetap
    useEffect(() => {
        const t = setTimeout(() => setIsHiding(true), 10000); // 10 detik
        return () => clearTimeout(t);
    }, []);

    const openWhatsApp = () => {
        window.open("https://wa.me/6285155428611", "_blank");
    };

    return (
        <div
            className="
        fixed
        right-4 bottom-6         /* pojok kanan bawah */
        md:right-6 md:bottom-8   /* sedikit longgar di desktop */
        z-[9999]
        flex items-center gap-2
      "
        >
            {/* Bubble text */}
            <div
                className={`
          hidden md:block
          bg-white shadow-lg rounded-2xl rounded-br-sm px-3 py-2 text-sm text-gray-700
          animate__animated
          ${isHiding ? "animate__fadeOutRight" : "animate__fadeInRight"} animate__delay-2s
        `}
            >
                What can we help?
            </div>

            {/* Tombol WA */}
            <button
                onClick={openWhatsApp}
                aria-label="Chat via WhatsApp"
                className="bg-[#25D366] rounded-full shadow-lg hover:brightness-110 transition p-3 md:p-4 animate__animated animate__fadeInRight animate__delay-2s"
            >
                <svg
                    viewBox="0 0 32 32"
                    className="w-7 h-7 md:w-8 md:h-8"
                    aria-hidden="true"
                >
                    <circle cx="16" cy="16" r="16" fill="#25D366" />
                    <path
                        d="M23.5 8.6A8.9 8.9 0 0 0 16 6a8.9 8.9 0 0 0-8.9 8.9c0 1.6.4 3.1 1.2 4.4L7 26l6-1.6a9 9 0 0 0 3 .5 8.9 8.9 0 0 0 8.9-8.9 8.8 8.8 0 0 0-1.4-7.4Zm-7.5 12c-1.2 0-2.3-.3-3.3-.9l-.2-.1-2 .5.6-1.9-.1-.2a5.3 5.3 0 0 1-.8-2.8 5.2 5.2 0 0 1 5.2-5.2c1.4 0 2.7.5 3.7 1.5a5.1 5.1 0 0 1 1.5 3.7 5.2 5.2 0 0 1-5.2 5.2Z"
                        fill="white"
                    />
                </svg>
            </button>
        </div>
    );
}
