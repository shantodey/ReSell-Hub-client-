import { getAllOrdersHero } from '@/lib/api/prodectData';
import React from 'react';

import { FiTrendingDown, FiGlobe, FiTrash2, FiAward } from 'react-icons/fi';

const SustainabilityImpact = async () => {
    const orders = await getAllOrdersHero();
    
    let deliveredCount = 0;
    if (Array.isArray(orders)) {
        deliveredCount = orders.filter(o => o.orderStatus?.trim() === 'delivered').length;
    }
    const wasteSaved = deliveredCount * 3; 
    const co2Saved = deliveredCount * 10;

    const impacts = [
        {
            id: 1,
            title: "Total Rehomed Items",
            value: `${deliveredCount.toLocaleString()}+`,
            desc: "Products saved from going to the landfill.",
            icon: <FiAward className="text-emerald-600 text-2xl" />,
            bg: "bg-emerald-50",
            border: "border-emerald-100"
        },
        {
            id: 2,
            title: "Waste Prevention",
            value: `${wasteSaved.toLocaleString()} kg`,
            desc: "Estimated solid waste reduced by reusing products.",
            icon: <FiTrash2 className="text-teal-600 text-2xl" />,
            bg: "bg-teal-50",
            border: "border-teal-100"
        },
        {
            id: 3,
            title: "Carbon Offset",
            value: `${co2Saved.toLocaleString()} kg`,
            desc: "CO2 emissions avoided compared to buying brand new.",
            icon: <FiTrendingDown className="text-green-600 text-2xl" />,
            bg: "bg-green-50",
            border: "border-green-100"
        },
        {
            id: 4,
            title: "Eco Contribution",
            value: "100%",
            desc: "Pure sustainable consumption by ReSell Hub community.",
            icon: <FiGlobe className="text-cyan-600 text-2xl" />,
            bg: "bg-cyan-50",
            border: "border-cyan-100"
        }
    ];

    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full">
                        Our Eco-Footprint
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 tracking-tight">
                        Making a Difference with Every Purchase
                    </h2>
                    <p className="text-gray-500 mt-3 text-lg">
                        By choosing pre-owned products, our community actively reduces waste, promotes circular economy, and builds a sustainable future.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {impacts.map((item) => (
                        <div
                            key={item.id}
                            className={`p-6 rounded-2xl border ${item.border} ${item.bg} flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1`}
                        >
                            <div>
                                <div className="p-3 w-fit rounded-xl bg-white shadow-sm mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    {item.title}
                                </h3>
                                <p className="text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">
                                    {item.value}
                                </p>
                            </div>
                            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SustainabilityImpact;