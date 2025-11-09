import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

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
    return (js + 6) % 7;
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
    return day.slots.map((s) => `${to12h(s.start)} - ${to12h(s.end)}`).join("; ");
}

function StatusBadge({ open }) {
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${open ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
            aria-live="polite"
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
            className={`w-56 shrink-0 rounded-2xl border p-3 shadow-sm ${highlight
                ? "bg-emerald-50 border-emerald-300 ring-1 ring-emerald-200"
                : "bg-white border-neutral-200"
                }`}
        >
            <h4 className={`text-sm font-semibold ${highlight ? "text-emerald-900" : "text-neutral-800"}`}>{day.label}</h4>
            <p className={`mt-1 text-sm ${highlight ? "text-emerald-800" : "text-neutral-600"}`}>{prettySlots(day)}</p>
            <div className="mt-2"><StatusBadge open={open} /></div>
        </div>
    );
}

export default function StoreHoursSection({ schedule }) {
    const todayIndex = getTodayIndex();
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const segWidthRef = useRef(0);
    const isDownRef = useRef(false);
    const startXRef = useRef(0);
    const startScrollRef = useRef(0);
    const [dragging, setDragging] = useState(false);

    function centerTo(idx, smooth = false) {
        const c = containerRef.current;
        const el = itemRefs.current[idx];
        if (!c || !el) return;
        const target = el.offsetLeft + el.offsetWidth / 2 - c.clientWidth / 2;
        if (smooth) c.scrollTo({ left: target, behavior: "smooth" });
        else c.scrollLeft = target;
    }

    useLayoutEffect(() => {
        const c = containerRef.current;
        if (!c) return;
        const total = c.scrollWidth;
        segWidthRef.current = total / 3;
        const midIndex = schedule.length + todayIndex;
        requestAnimationFrame(() => centerTo(midIndex));
    }, [schedule, todayIndex]);

    useEffect(() => {
        const c = containerRef.current;
        if (!c) return;
        const onWheel = (e) => {
            if (!c) return;
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                c.scrollLeft += e.deltaY;
            } else if (e.deltaX !== 0) {
                c.scrollLeft += e.deltaX;
            }
        };
        c.addEventListener("wheel", onWheel, { passive: false });
        return () => c.removeEventListener("wheel", onWheel);
    }, []);

    useEffect(() => {
        function onResize() {
            const c = containerRef.current;
            if (!c) return;
            const total = c.scrollWidth;
            segWidthRef.current = total / 3;
            const midIndex = schedule.length + todayIndex;
            requestAnimationFrame(() => centerTo(midIndex));
        }
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [schedule, todayIndex]);

    function handleScroll() {
        const c = containerRef.current;
        const seg = segWidthRef.current;
        if (!c || !seg) return;
        if (c.scrollLeft < seg * 0.5) {
            c.scrollLeft += seg;
        } else if (c.scrollLeft > seg * 2.5) {
            c.scrollLeft -= seg;
        }
    }

    function onPointerDown(e) {
        const c = containerRef.current;
        if (!c) return;
        isDownRef.current = true;
        setDragging(true);
        c.setPointerCapture(e.pointerId);
        startXRef.current = e.clientX;
        startScrollRef.current = c.scrollLeft;
    }
    function onPointerMove(e) {
        const c = containerRef.current;
        if (!c || !isDownRef.current) return;
        e.preventDefault();
        const dx = e.clientX - startXRef.current;
        c.scrollLeft = startScrollRef.current - dx;
    }
    function onPointerUp(e) {
        const c = containerRef.current;
        if (!c) return;
        isDownRef.current = false;
        setDragging(false);
        try { c.releasePointerCapture(e.pointerId); } catch { }
    }

    const tripled = [...schedule, ...schedule, ...schedule];

    return (
        <section className="py-10">
            <div className="mx-auto max-w-5xl px-4"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="300"
                data-aos-once="true">
                <div className="text-center">
                    <h2 data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-once="true" className="text-3xl font-bold tracking-tight sm:text-4xl">Store Hours</h2>
                    <p data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="300"
                        data-aos-once="true" className="mx-auto mt-3 max-w-2xl text-neutral-600">
                        We’re here to serve you during the following hours. Plan your visit accordingly!
                    </p>
                </div>

                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    className={`mt-8 flex gap-3 overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${dragging ? "select-none cursor-grabbing" : "cursor-grab"}`}
                >
                    {tripled.map((d, i) => {
                        const originalIdx = i % schedule.length;
                        const highlight = originalIdx === todayIndex;
                        return (
                            <div
                                key={`${i}-${d.label}`}
                                ref={(el) => { if (el) itemRefs.current[i] = el; }}
                                className="snap-center select-none"
                            >
                                <DayCard day={d} highlight={highlight} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
