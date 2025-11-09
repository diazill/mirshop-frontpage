// src/components/ServiceOptionsSection.jsx
export default function ServiceOptionsSection() {
    const leftColumn = ["Pesan antar", "Ambil di toko"];
    const rightColumn = ["Belanja di toko", "Layanan di tempat"];

    const Item = ({ label }) => (
        <div className="flex items-center gap-2">
            <svg
                className="w-5 h-5 flex-shrink-0 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-base md:text-lg text-slate-800">{label}</span>
        </div>
    );

    return (
        <section className="py-6 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center animate__animated animate__fadeInUp animate__delay-2s">
                    Opsi Layanan
                </h2>
                <div className="mt-6 flex flex-col sm:flex-row sm:justify-center sm:gap-20">
                    <div className="space-y-4 sm:text-left animate__animated animate__fadeInLeft animate__delay-3s">
                        {leftColumn.map((label) => (
                            <Item key={label} label={label} />
                        ))}
                    </div>
                    <div className="mt-4 sm:mt-0 space-y-4 sm:text-left animate__animated animate__fadeInRight animate__delay-3s">
                        {rightColumn.map((label) => (
                            <Item key={label} label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
