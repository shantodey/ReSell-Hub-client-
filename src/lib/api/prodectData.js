export const prodectData = async (filters = {}) => {
    const { search = "", category = "", sort = "" } = filters;
    const queryParams = new URLSearchParams({ search, category, sort }).toString();
    const url = `${process.env.SERVER_URL}/app/product?${queryParams}`;
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store" 
        });
        
        if (!res.ok) throw new Error("Failed to fetch data from server");
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Fetch Error:", error);
        return []; 
    }
};

export const getSingleProduct=async(id)=> {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/app/product/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching single product:", error);
        return null;
    }
}