import Link from "next/link";

import { ICategory, IExtendedProduct, IProduct } from "@/types/types";
import ProductCard from "@/components/custom/shop/product/product-card";

const qs = require('qs');


export default async function Category({ params }: { params: Promise<{ slugs: string[] }> }) {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    const slugs = (await params).slugs;

    const currentUrl = "/" + slugs.join('/');

    //TODO test response status and handle errors
    //TODO parse returned data to IStrapiAPIResponse
    const response = await fetch(`${apiUrl}/category-page${currentUrl}`);
    if (!response.ok) {
        console.log("Error fetching data", response.statusText);
        throw new Error('Failed to fetch data');

    }

    const { currentCategory, children, products } = await response.json() as { currentCategory: ICategory, children: ICategory[], products: IExtendedProduct[] };


    return (
        <main className="p-2 flex flex-col gap-4">
            <h1 className="text-center font-bold">Check our {currentCategory.name} {children.length > 0 ? 'categories' : 'products'} !</h1>
            <div className="grid grid-cols-2 gap-2">
                {children?.map((category: any) => (
                    <div className="bg-card p-2 rounded-lg border text-center" key={category.documentId}>
                        <Link href={`/category${category.slug}`}>{category.name}</Link>
                    </div>
                ))}
            </div>
            <h2>Check our products !</h2>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-6 md:grid-cols-3 justify-items-center">
                {products?.map((product: IExtendedProduct) => (
                    <ProductCard product={product} key={`product-${product.documentId}`} />
                ))}
                {!products && <div>No products found</div>}
            </div>
        </main>
    );

}