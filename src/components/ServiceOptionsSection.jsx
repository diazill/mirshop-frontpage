// src/components/ServiceOptionsSection.jsx
import { Truck, Store, Package, BadgeCheck } from "lucide-react";
export default function ServiceOptionsSection() {
    const items = [
        { label: "Pesan antar", Icon: Truck },
        { label: "Belanja di toko", Icon: Store },
        { label: "Ambil di toko", Icon: Package },
        { label: "Layanan di tempat", Icon: BadgeCheck },
    ];

    const Item = ({ label, Icon }) => (
        <div className="flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100">
                <Icon className="w-7 h-7 text-green-600" />
            </div>
            <span className="text-base font-semibold text-slate-800">{label}</span>
        </div>
    );

    return (
        <section className="py-10 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10 animate__animated animate__fadeInUp animate__delay-2s">
                    Opsi Layanan
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-once="true">
                    {items.map((item) => (
                        <Item key={item.label} label={item.label} Icon={item.Icon} />
                    ))}
                </div>
            </div>
        </section>
    );
}
