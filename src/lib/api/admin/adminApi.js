"use server"

export const adminUserSearch = async (search) => {
    const req = await fetch(`${process.env.SERVER_URL}/app/admin/users?search=${search}`, { cache: 'no-store' })
    const res = req.ok ? await req.json() : [];
    return res

}


export const adminUserDeleteBlock = async (payload, id, actionType) => {
    // যদি এটি সার্ভার সাইড ফাইল হয়, তবে ক্লায়েন্ট থেকে কল করতে হলে 'use server' দিতে পারেন, অথবা এনভায়রনমেন্ট ভেরিয়েবল চেক করুন
    const response = await fetch(`${process.env.SERVER_URL}/app/admin/user-action/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: actionType, ...payload })
    });

    // এরর এড়াতে পুরো Response অবজেক্ট না পাঠিয়ে শুধু plain JSON ডাটা বা একটা ফ্ল্যাট অবজেক্ট পাঠান
    if (!response.ok) return { success: false };
    const data = await response.json();
    return { success: true, data };
};