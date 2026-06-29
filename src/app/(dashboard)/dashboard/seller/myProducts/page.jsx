"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Button, Chip } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getMyProducts } from "@/lib/api/seller/action";

const MyProductPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userEmail = session?.user?.email;

useEffect(() => {
    if (!userEmail) return;
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true); 
        setError("");
        const data = await getMyProducts(userEmail, { signal: controller.signal });
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Failed to load products");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [userEmail]);

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...");
    } else {
      toast.dismiss();
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold"> My Products</h1>
        <p className="text-default-500 mt-2"> Manage all your listed products. </p>
      </div>
      {products.length === 0 ? (
        <Card className="p-10">
          <div className="text-center">
            <h2 className="text-xl font-semibold">  No Products Found </h2>
            <p className="text-default-500 mt-2">  You havent added any products yet. </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product._id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-1" >
              <div className="relative">
                <img src={product?.images?.[0] || "https://placehold.co/600x400?text=No+Image"} alt={product?.title || "Product"} className="w-full h-60 object-cover" />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <Chip color="primary" variant="flat"> {product?.category || "Uncategorized"} </Chip>
                  <span className="text-sm text-default-500"> {product?.condition || "N/A"}</span>
                </div>

                <h2 className="text-xl font-bold line-clamp-1"> {product?.title}</h2>
                <p className="text-default-500 mt-2 line-clamp-3"> {product?.description}</p>

                <div className="flex justify-between items-center mt-5 pt-4 border-t">
                  <span className="text-2xl font-bold text-primary"> ৳{product?.price || 0}</span>
                  <Link color="primary" href={`/dashboard/seller/myProducts/${product._id}`}>
                    <Button color="primary">View Details</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProductPage;