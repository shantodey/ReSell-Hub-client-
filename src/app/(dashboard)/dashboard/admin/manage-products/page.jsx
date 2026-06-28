
import ProductTableClient from '@/app/Component/Dashboard/ProductTableClient';
import { fetchAdminProducts } from '@/lib/api/admin/adminApi';



export default async function ManageProductsPage() {
    const products = await fetchAdminProducts();

    return (
        <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Manage Products</h1>
                <p className="text-sm text-gray-500">Review, approve, reject or delete platform product listings.</p>
            </header>

            <ProductTableClient initialProducts={products} />
        </div>
    );
}