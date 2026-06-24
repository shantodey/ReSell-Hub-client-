import { data } from "motion/react-client";
import { baseUrl } from "./baseUrl"

//  export const serverMutation=async(path,method)=>{
//     const res=await fetch(`${baseUrl}${path}`,{
//         method:method,
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify(data)
//     });
//     return res.json();
// }
export const serverMutation = async (path, method, data) => {
    const url = `${baseUrl}${path}`;
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