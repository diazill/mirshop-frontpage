import { useMemo, useRef, useState } from "react";

const formatCurrency = (n) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

export default function BestSellingProducts({ products = SAMPLE_PRODUCTS }) {
    const [filter, setFilter] = useState("Best"); // default ke Best
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const display = useMemo(() => {
        if (filter === "All") return products;
        if (filter === "Best") return products.filter((p) => p.isBestProduct === true);
        return products.filter((p) => p.category === filter);
    }, [filter, products]);

    const scroll = (dir) => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    };

    // drag to scroll
    const onPointerDown = (e) => {
        const el = containerRef.current;
        if (!el) return;
        isDragging.current = true;
        el.setPointerCapture?.(e.pointerId);
        startX.current = e.clientX;
        scrollLeft.current = el.scrollLeft;

        // Lock page scroll while dragging (tanpa preventDefault)
        const root = document.documentElement;
        root.style.overflowY = "hidden"; // hentikan scroll halaman
        root.style.userSelect = "none";  // cegah seleksi teks saat drag
    };
    const onPointerMove = (e) => {
        if (!isDragging.current) return;
        const el = containerRef.current;
        if (!el) return;
        const x = e.clientX - startX.current;
        el.scrollLeft = scrollLeft.current - x;
        // opsional: cegah seleksi teks saat drag
        window.getSelection?.().removeAllRanges?.();
    };
    const onPointerUp = (e) => {
        const el = containerRef.current;
        isDragging.current = false;
        el?.releasePointerCapture?.(e.pointerId);

        // Restore page scroll
        const root = document.documentElement;
        root.style.overflowY = "";
        root.style.userSelect = "";
    };

    const onWheel = (e) => {
        const el = containerRef.current;
        if (!el) return;
        // Arahkan scroll vertikal menjadi horizontal tanpa preventDefault
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            el.scrollBy({ left: e.deltaY });
        }
    };

    return (
        <section className="min-h-[80vh] w-full bg-stone-50">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-12 md:py-16">
                <div className="text-center space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-once="true"
                    >Best Selling Products</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="300"
                        data-aos-once="true"
                    >
                        Discover our most popular items loved by pet owners and poultry enthusiasts in the
                        community.
                    </p>
                </div>

                {/* Pills */}
                <div className="flex items-center justify-center gap-3 mt-6"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="300"
                    data-aos-once="true">
                    {["Best", "Pets", "Poultry", "All"].map((cat) => {
                        const active = filter === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={
                                    "rounded-full border px-5 py-2 text-sm font-medium transition " +
                                    (active
                                        ? "bg-green-700 border-green-700 text-white shadow"
                                        : "bg-white border-stone-300 text-stone-700 hover:border-stone-400")
                                }
                            >
                                {cat === "All" ? "All Products" : cat}
                            </button>
                        );
                    })}
                </div>

                <div className="relative mt-10"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="400"
                    data-aos-once="true">
                    {/* tombol kiri */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-10
             bg-white shadow rounded-full p-2 hover:bg-stone-100"
                        aria-label="Scroll left"
                    >
                        ◀
                    </button>

                    <div
                        ref={containerRef}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        onWheel={onWheel}
                        className="
              flex gap-4 sm:gap-6
              overflow-x-auto overflow-y-hidden
              scroll-smooth
              px-8 sm:px-10
              cursor-grab active:cursor-grabbing
              select-none
              pb-6 md:pb-4
              touch-pan-x            /* batasi gesture horizontal */
              overscroll-x-contain overscroll-y-none  /* cegah scroll chaining ke body & Y di container */
              snap-x snap-mandatory  /* snap antar kartu */
            "
                    >
                        {display.map((item) => (
                            <div
                                key={item.id}
                                className="flex-shrink-0 w-60 sm:w-64 md:w-72 bg-white rounded-2xl shadow-sm ring-1 ring-stone-200 overflow-hidden hover:shadow-md transition group mb-6 flex flex-col snap-start"
                            >
                                <div className="aspect-[4/3] w-full overflow-hidden relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover group-hover:scale-105 transition"
                                    />
                                    {item.isBestProduct && (
                                        <span className="absolute left-2 top-2 rounded-full bg-green-700 text-white text-[11px] px-2 py-1">
                                            Best
                                        </span>
                                    )}
                                </div>

                                <div className="p-4 sm:p-5 space-y-2 sm:space-y-3 flex-1">
                                    <p className="text-xs text-stone-500">{item.category}</p>
                                    <h3 className="text-base sm:text-lg font-semibold text-stone-800 min-h-[48px]">{item.title}</h3>
                                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{item.blurb}</p>
                                </div>

                                <div className="mt-auto p-4 pt-0 sm:pt-0 sm:p-5 flex items-center justify-between">
                                    <span className="text-sm sm:text-base font-semibold text-green-700">
                                        {formatCurrency(item.price)}
                                    </span>
                                    <button className="rounded-lg bg-green-700 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-green-800">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* tombol kanan */}
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-10
             bg-white shadow rounded-full p-2 hover:bg-stone-100"
                        aria-label="Scroll right"
                    >
                        ▶
                    </button>
                </div>
            </div>
        </section>
    );
}
