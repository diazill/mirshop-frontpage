import DataImage from "../data";

const Footer = () => {
  return (
    <footer className="w-full bg-[#00863F] border-t border-[#006d34] text-sm text-white mt-12 rounded-t-2xl shadow-inner pt-8">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-10 md:flex-row md:justify-between">
        {/* Brand & description */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e3cf]">
              <span className="text-xl" role="img" aria-label="pet-logo">
                <img
                  src="/assets/mirlogoico.ico"
                  alt="Hero Image"
                  className="w-full md:ml-auto"
                  loading="lazy"
                />
              </span>
            </div>
            <div className="leading-tight">
              <p className="text-base font-semibold text-white">
                MIR PET SHOP &amp; PAKAN TERNAK
              </p>
            </div>
          </div>

          <p className="text-[13px] leading-relaxed text-gray-100 max-w-xs">
            Your trusted neighborhood source for quality pet supplies and poultry
            products.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/4">
          <h3 className="mb-3 text-base font-semibold text-white">
            Quick Links
          </h3>
          <ul className="space-y-1.5 text-[13px]">
            <li>
              <a href="#" className="transition hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-gray-200">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-gray-200">
                Location
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-gray-200">
                Hours
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:w-1/3">
          <h3 className="mb-3 text-base font-semibold text-white">
            Contact Us
          </h3>
          <ul className="space-y-2 text-[13px]">
            <li className="flex items-start gap-2">
              <span className="mt-[2px] text-yellow-300">★</span>
              <span>(555) 123-4567</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[2px] text-yellow-300">★</span>
              <span>info@petpoultry.com</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[2px] text-yellow-300">★</span>
              <span>123 Main Street, Your Town, ST 12345</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#006d34] bg-[#047857] rounded-b-2xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-[12px] text-gray-100 md:flex-row md:items-center md:justify-between">
          <p>© 2025 Pet &amp; Poultry Finder. All rights reserved.</p>

          <div className="flex gap-4">
            <button className="text-[12px] lowercase tracking-wide hover:text-yellow-300">
              facebook
            </button>
            <button className="text-[12px] lowercase tracking-wide hover:text-yellow-300">
              photo_camera
            </button>
            <button className="text-[12px] lowercase tracking-wide hover:text-yellow-300">
              chat
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
