import ProductDetailsClient from "@/app/Component/ProductDetailsClient";
import { getSingleProduct } from "@/lib/api/prodectData";



export default async function ProductDetailsPage({ params }) {
   
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    const product = await getSingleProduct(id);

    if (!product) {
        return (
            <div className="container mx-auto px-6 py-24 text-center">
                <h2 className="text-2xl font-bold text-slate-800">Product Not Found!</h2>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-6 py-12">
            <ProductDetailsClient product={product} />
        </main>
    );
}