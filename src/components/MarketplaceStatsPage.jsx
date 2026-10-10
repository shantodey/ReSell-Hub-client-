
import { FiCheckCircle, FiUsers, FiBox, FiShoppingBag } from 'react-icons/fi';
import { getAllOrdersHero, getAllUsers, prodectData } from '@/lib/api/prodectData';

export default async function MarketplaceStatsPage() {
    const [productsRes, usersRes, ordersRes] = await Promise.all([
        prodectData(),
        getAllUsers(),
        getAllOrdersHero()
    ]);

    const approvedCount = productsRes?.totalProdect || 0;

    let sellerCount = 0;
    let buyerCount = 0;
    if (Array.isArray(usersRes)) {
        sellerCount = usersRes.filter(u => u.role?.trim() === 'seller').length;
        buyerCount = usersRes.filter(u => u.role?.trim() === 'buyer').length;
    }

    let deliveredCount = 0;
    if (Array.isArray(ordersRes)) {
        deliveredCount = ordersRes.filter(o => o.orderStatus?.trim() === 'delivered').length;
    }

    const stats = [
        { 
            id: 1, 
            value: `${approvedCount}+`, 
            label: 'Products Listed', 
            icon: <FiBox className="text-blue-600 text-2xl md:text-3xl" />, 
            bg: 'bg-blue-50' 
        },
        { 
            id: 2, 
            value: `${sellerCount}+`, 
            label: 'Verified Sellers', 
            icon: <FiCheckCircle className="text-pink-500 text-2xl md:text-3xl" />, 
            bg: 'bg-pink-50' 
        },
        { 
            id: 3, 
            value: `${buyerCount}+`, 
            label: 'Happy Buyers', 
            icon: <FiUsers className="text-indigo-600 text-2xl md:text-3xl" />, 
            bg: 'bg-indigo-50' 
        },
        { 
            id: 4, 
            value: `${deliveredCount}+`, 
            label: 'Orders Completed', 
            icon: <FiShoppingBag className="text-emerald-600 text-2xl md:text-3xl" />, 
            bg: 'bg-emerald-50' 
        },
    ];

    return (
        <main className="min-h-[85vh] bg-gradient-to-br from-slate-50 via-white to-blue-50/20 px-4 md:px-8 flex items-center justify-center">
            <div className="max-w-6xl w-full mx-auto space-y-12">
                
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight">
                        Marketplace <span className="text-emerald-600">Live Statistics</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-sm md:text-base">
                        Real-time overview of our growing community network, products, and successful orders.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-300/80 flex flex-col justify-between min-h-[170px]"
                        >
                            <div className={`p-4 rounded-2xl ${stat.bg} w-fit flex items-center justify-center shadow-inner mb-4`}>
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}