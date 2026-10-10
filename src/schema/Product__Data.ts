import z from "zod";

export const productDataSchma= z.object({
    title:z.string(),
    category:z.string(),
    condition:z.string(),
    price:z.number(),
    images: z.array(z.string()),
    description:z.string(),
    sellerInfo:z.object({
        name:z.string(),
        email:z.string(),
        phone:z.string(),
        sellerimg: z.string().url().optional().nullable(),
    }),
    createdAt:z.date(),
    status:z.string(),
    quantity:z.number(),
})