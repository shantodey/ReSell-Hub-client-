

export const serverMutation = async (path, method, data) => {
    const url = `${process.env.SERVER_URL}${path}`;
    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const text = await res.text();
    return text;
}
 export const serverFetch=async(path)=>{
    const res=await fetch(`${baseUrl}/${path}`);
    return res.json();
}