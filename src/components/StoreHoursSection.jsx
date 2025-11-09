import React, { useLayoutEffect, useRef, useState } from "react";

function toMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

function isNowWithin(start, end, now = new Date()) {
    const n = now.getHours() * 60 + now.getMinutes();
    const s = toMinutes(start);
    const e = toMinutes(end);
    if (s <= e) return n >= s && n < e;
    return n >= s || n < e;
}

function getTodayIndex() {
    const js = new Date().getDay();
    return (js + 6) % 7; // Senin = 0
}

function isOpenNow(day, isToday) {
    if (day.closed) return false;
    if (!isToday) return false;
    return day.slots?.some((s) => isNowWithin(s.start, s.end));
}

function prettySlots(day) {
    if (day.closed) return "Closed";
    if (!day.slots || day.slots.length === 0) return "Closed";

    const to12h = (t) => {
        const [H, M] = t.split(":").map(Number);
        const h = ((H + 11) % 12) + 1;
        const ampm = H < 12 ? "AM" : "PM";
        return `${h}:${String(M).padStart(2, "0")} ${ampm}`;
    };

    return day.slots
        .map((s) => `${to12h(s.start)} - ${to12h(s.end)}`)
        .join("; ");
}

function StatusBadge({ open }) {
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${open ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
        >
            {open ? (
                <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                </svg>
            ) : (
                <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M18.3 5.71 12 12.01l-6.29-6.3-1.42 1.42L10.59 13.4l-6.3 6.3 1.42 1.41 6.29-6.29 6.3 6.29 1.41-1.41-6.29-6.3 6.29-6.29z" />
                </svg>
            )}
            {open ? "Open" : "Closed"}
        </span>
    );
}

function DayCard({ day, highlight }) {
    const open = isOpenNow(day, highlight);

    return (
        <div
            className={`
        flex-shrink-0
        w-60 sm:w-64 md:w-72
        rounded-2xl border p-3 shadow-sm
        ${highlight
                    ? "bg-emerald-50 border-emerald-300 ring-1 ring-emerald-200"
                    : "bg-white border-neutral-200"
                }
      `}
        >
            <h4
                className={`text-sm font-semibold ${highlight ? "text-emerald-900" : "text-neutral-800"
                    }`}
            >
                {day.label}
            </h4>
            <p
                className={`mt-1 text-sm ${highlight ? "text-emerald-800" : "text-neutral-600"
                    }`}
            >
                {prettySlots(day)}
            </p>
            <div className="mt-2">
                <StatusBadge open={open} />
            </div>
        </div>
    );
}

export default function StoreHoursSection({ schedule }) {
    const todayIndex = getTodayIndex();

    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const [dragging, setDragging] = useState(false);

    // tombol kiri/kanan (kayak di produk)
    const scroll = (dir) => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollBy({ left: dir === "left" ? -250 : 250, behavior: "smooth" });
    };

    // auto center ke hari ini saat pertama load
    useLayoutEffect(() => {
        const el = containerRef.current;
        const card = itemRefs.current[todayIndex];
        if (!el || !card) return;

        const target = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
        el.scrollTo({ left: target, behavior: "instant" });
    }, [todayIndex, schedule]);

    // drag to scroll (copas pola BestSellingProducts)
    const onPointerDown = (e) => {
        const el = containerRef.current;
        if (!el) return;
        isDragging.current = true;
        setDragging(true);
        el.setPointerCapture?.(e.pointerId);
        startX.current = e.clientX;
        scrollLeft.current = el.scrollLeft;

        const root = document.documentElement;
        root.style.overflowY = "hidden";
        root.style.userSelect = "none";
    };

    const onPointerMove = (e) => {
        if (!isDragging.current) return;
        const el = containerRef.current;
        if (!el) return;
        const x = e.clientX - startX.current;
        el.scrollLeft = scrollLeft.current - x;
        window.getSelection?.().removeAllRanges?.();
    };

    const onPointerUp = (e) => {
        const el = containerRef.current;
        isDragging.current = false;
        setDragging(false);
        el?.releasePointerCapture?.(e.pointerId);

        const root = document.documentElement;
        root.style.overflowY = "";
        root.style.userSelect = "";
    };

    const onWheel = (e) => {
        const el = containerRef.current;
        if (!el) return;
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            el.scrollBy({ left: e.deltaY });
        }
    };

    return (
        <section className="py-4 bg-white">
            <div
                className="mx-auto max-w-5xl px-4"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="300"
                data-aos-once="true"
            >
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        className="text-3xl font-bold tracking-tight sm:text-4xl"
                    >
                        Store Hours
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="300"
                        data-aos-once="true"
                        className="mx-auto mt-3 max-w-2xl text-neutral-600"
                    >
                        We’re here to serve you during the following hours. Plan your visit accordingly!
                    </p>
                </div>

                <div className="relative mt-10">
                    {/* tombol kiri kayak di produk */}
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
                        className={`
              flex gap-4 sm:gap-6
              overflow-x-auto overflow-y-hidden
              scroll-smooth
              px-8 sm:px-10
              cursor-grab active:cursor-grabbing
              select-none
              pb-6 md:pb-4
              touch-pan-x
              overscroll-x-contain overscroll-y-none
              snap-x snap-mandatory
            `}
                    >
                        {schedule.map((day, i) => {
                            const highlight = i === todayIndex;
                            return (
                                <div
                                    key={day.label}
                                    ref={(el) => {
                                        if (el) itemRefs.current[i] = el;
                                    }}
                                    className="snap-start"
                                >
                                    <DayCard day={day} highlight={highlight} />
                                </div>
                            );
                        })}
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
