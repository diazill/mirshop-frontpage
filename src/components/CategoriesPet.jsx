import React from "react";
import products from "../product.json";
import categories from "../categoriesPet.json";

export default function AnimalCategoriesSection() {
    const activeCategoryNames = Array.from(
        new Set(products.map((p) => p.category_pets))
    );

    const animalCategories = categories
        .filter((cat) => activeCategoryNames.includes(cat.name))
        .sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <section className="w-full bg-white py-10">
            <div className="max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                    {animalCategories.map((item, index) => (
                        <button
                            key={item.slug}
                            type="button"
                            className={`group relative flex items-center rounded-full px-5 py-3 bg-salem text-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 gap-4 animate__animated animate__fadeInLeft animate__delay-${index + 1}s`}
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border border-emerald-200 flex items-center justify-center shadow-md overflow-hidden">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="text-left">
                                <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">
                                    Kategori Pet
                                </span>
                                <span className="block text-lg md:text-xl font-extrabold leading-snug">
                                    {item.name}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}