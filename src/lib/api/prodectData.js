export const prodectData = async (filters = {}) => {
    const { search = "", category = "", sort = "" } = filters;
    const queryParams = new URLSearchParams({ search, category, sort }).toString();
    const url = `http://localhost:5000/app/product?${queryParams}`;
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