"use server"

export const adminUserSearch = async (search) => {
    const req = await fetch(`${process.env.SERVER_URL}/app/admin/users?search=${search}`, { cache: 'no-store' })
    const res = req.ok ? await req.json() : [];
    return res

}

export const adminUserDeleteBlock = async (payload, id, actionType) => {
    const req = await fetch(`${process.env.SERVER_URL}/app/admin/user-action/${id}?actionType=${actionType}`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    return await req.json();
}


export const fetchAdminProducts = async () => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/app/admin/products`, {
            cache: 'no-store'
        });
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("Fetch products error:", error);
        return [];
    }
};

export const adminProductAction = async (id, actionType) => {
    try {
        const response = await fetch(`${process.env.SERVER_URL}/app/admin/product-action/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: actionType })
        });

        if (!response.ok) return { success: false };
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Product action error:", error);
        return { success: false };
    }
};