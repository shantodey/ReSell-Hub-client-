"use server";
export const getLatestProducts = async () => {
    try {
        const req = await fetch(`${process.env.SERVER_URL}/app/latest-products`, {
            method: 'GET',
            cache: 'no-store'
        });
        const result = await req.json();
        return result;
    } catch (error) {
        console.error("Error fetching latest products:", error);
        return [];
    }
}