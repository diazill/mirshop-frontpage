import React from "react";

const product = {
    id: "1",
    name: "Max Petwound 10gr Obat Tabur Luka Hewan Kucing & Anjing",
    category: "Obat & Vitamin Kucing",
    price: 0.0,
    description:
        "Produk perawatan hewan untuk membantu menyembuhkan luka pada kucing dan anjing. Diformulasikan agar aman digunakan dan efektif mempercepat proses penyembuhan luka luar.",
    details: [
        { label: "Berat", value: "0.025 gram" },
        { label: "Dimensi", value: "1 x 1 x 1 cm" },
    ],
    image:
        "https://images.pexels.com/photos/7210272/pexels-photo-7210272.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
        "https://images.pexels.com/photos/7210272/pexels-photo-7210272.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/7210269/pexels-photo-7210269.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/7210270/pexels-photo-7210270.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
};

export default function ProductDetailPage() {
    const [activeImage, setActiveImage] = React.useState(product.gallery[0]);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <nav className="text-xs text-gray-500 mb-6">
                    <span className="hover:underline cursor-pointer">Beranda</span> / {" "}
                    <span className="hover:underline cursor-pointer">Produk</span> / {" "}
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </nav>

                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <div className="bg-white rounded-[24px] shadow-lg overflow-hidden border border-green-100">
                                <img
                                    src={activeImage}
                                    alt={product.name}
                                    className="w-full h-[300px] sm:h-[380px] lg:h-[450px] object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 justify-center">
                            {product.gallery.map((src, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setActiveImage(src)}
                                    className={`border rounded-xl overflow-hidden w-14 h-14 sm:w-16 sm:h-16 bg-white transition-all duration-150 ${activeImage === src
                                            ? "border-green-500 ring-2 ring-green-200"
                                            : "border-gray-200 hover:border-green-300"
                                        }`}
                                >
                                    <img
                                        src={src}
                                        alt={`${product.name} thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-7">
                        <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 mb-3">
                            {product.category}
                        </span>

                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
                            {product.name}
                        </h1>

                        <p className="text-sm md:text-base text-gray-700 mb-5">
                            {product.description}
                        </p>

                        <p className="text-3xl font-semibold text-green-700 mb-4">
                            Rp{product.price.toFixed(0)}
                        </p>

                        <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-900 mb-6">
                            This page is for information and reference only. Products cannot
                            be purchased or added to a cart from this website.
                        </div>

                        <div className="mt-4">
                            <h2 className="text-sm font-semibold text-gray-900 mb-3">
                                Informasi Tambahan
                            </h2>
                            <table className="w-full text-sm text-gray-700">
                                <tbody>
                                    {product.details.map((detail) => (
                                        <tr key={detail.label} className="border-b border-gray-100">
                                            <td className="py-2 font-medium w-1/3">{detail.label}</td>
                                            <td className="py-2">{detail.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
