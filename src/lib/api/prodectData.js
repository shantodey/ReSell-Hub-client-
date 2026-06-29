"use server"




export const getAllUsers = async () => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/app/admin/users`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}


export const getAllOrdersHero = async () => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/app/all-orders`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("Error fetching all orders for hero:", error);
        return [];
    }
}

export const prodectData = async (filters = {}) => {
    const { search = "", category = "", sort = "",pageNumber = "1" } = filters;
    const queryParams = new URLSearchParams({ search, category, sort,page: pageNumber }).toString();
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

export const getSingleProduct = async (id) => {
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

export const cheackOutData = async (session, sellerInfo, productId, orderQuantity, totalPrice) => {
    const req = await fetch(`${process.env.SERVER_URL}/app/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            buyerInfo: {
                userId: session.user.id || session.user._id,
                name: session.user.name,
                email: session.user.email,
            },
            sellerInfo: {
                userId: sellerInfo?.userId || "seller_id_here",
                name: sellerInfo?.name,
                email: sellerInfo?.email || "",
            },
            productId: productId,
            quantity: orderQuantity,
            totalPrice: totalPrice,
            paymentStatus: "unpaid",
            orderStatus: "processing"
        }),
    });

    const res = await req.json();
    return { ...res, ok: req.ok };
}

export const cheackOutProdectData = async (session) => {
    try {
        if (!session?.user?.email) return { orders: [] };
        const req = await fetch(`${process.env.SERVER_URL}/app/orders?email=${session.user.email}`, {
            cache: 'no-store'
        });

        if (!req.ok) {
            console.error(`Server error: ${req.status}`);
            return { orders: [] };
        }
        const res = await req.json();
        return res;
    } catch (error) {
        console.error("Fetch Error in cheackOutProdectData:", error);
        return { orders: [] };
    }
}

// for stripe 
export const createCheckoutSession = async (amount, email) => {
    const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, email }),
    });

    return await response.json();
};