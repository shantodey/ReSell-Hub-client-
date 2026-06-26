const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateProfile = async (payload) => {
    const response = await fetch(`${BASE_URL}/app/user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.");
    }
    return data;
};