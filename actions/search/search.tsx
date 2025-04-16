"use server"

const qs = require('qs');



export default async function SearchAction(search: string) {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const searchQuery = qs.stringify({
        filters: {
            name: {
                $contains: search
            }
        }

    })

    const res = await fetch(`${apiUrl}/products?${searchQuery}`)
    const data = await res.json()

    return data.data

}