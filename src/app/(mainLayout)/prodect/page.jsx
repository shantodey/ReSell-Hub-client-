

import ProductCard from "@/app/Component/ProductCard";
import { prodectData } from "@/lib/api/prodectData";


const AllProductsPage = async () => {
    const mockProducts = await prodectData()
    return (
        <main className="container mx-auto px-6 py-12">
            <div className="flex flex-col gap-8">
                <h1 className="text-3xl font-bold text-slate-900">Available Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
};
export default AllProductsPage;