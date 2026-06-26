import ProductCard from "@/app/Component/ProductCard";
import { prodectData } from "@/lib/api/prodectData";

export const dynamic = "force-dynamic";

const AllProductsPage = async ({ searchParams }) => {
    const resolvedParams = await searchParams;
    const search = resolvedParams?.search || "";
    const category = resolvedParams?.category || "";
    const sort = resolvedParams?.sort || "";

    const mockProducts = await prodectData({ search, category, sort });

    return (
        <main className="container mx-auto px-6 py-12">
            <div className="flex flex-col gap-8">
                <h1 className="text-3xl font-bold text-slate-900">Available Products</h1>
                <form method="GET" className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-700">Search by Name</label>
                        <input type="text" name="search" defaultValue={search} placeholder="Type product name..." className="border h-10 px-3 rounded-lg text-slate-800" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-700">Category</label>
                        <select name="category" defaultValue={category} className="border h-10 px-3 rounded-lg text-slate-800">
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Property">Property</option>
                            <option value="Home Appliances">Home Appliances</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-700">Sort by Price</label>
                        <select name="sort" defaultValue={sort} className="border h-10 px-3 rounded-lg text-slate-800">
                            <option value="">Default</option>
                            <option value="price-low">Price Low to High</option>
                            <option value="price-high">Price High to Low</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 rounded-lg font-medium transition-colors">
                            Apply Filters
                        </button>
                    </div>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockProducts && mockProducts.length > 0 ? (
                        mockProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <p className="text-slate-500 col-span-full text-center py-12">No products found!</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default AllProductsPage;