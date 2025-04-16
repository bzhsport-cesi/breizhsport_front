import Link from "next/link";

import { ICategory, IExtendedProduct, IProduct } from "@/types/types";

const qs = require('qs');


export default async function Category({ params }: { params: Promise<{ slugs: string[] }> }) {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const slugs = (await params).slugs;

    const currentUrl = "/" + slugs.join('/');

    //TODO test response status and handle errors
    //TODO parse returned data to IStrapiAPIResponse
    const response = await fetch(`${apiUrl}/category-page${currentUrl}`);
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
            <div className="grid grid-cols-2 gap-2">
                {products?.map((product: IExtendedProduct) => (
                    <Link href={`/product/${product.slug}`} className="bg-card p-2 rounded-lg border text-center flex flex-col justify-center items-center max-w-64" key={product.documentId}>
                        <img src={!product.defaultVariant.images ? 'https://placehold.co/800x800.png' : `${backendUrl}${product.defaultVariant.images[0].url}`} />
                        <span >{product.name}</span>
                        <span>{product.defaultVariant.price} €</span>
                    </Link>
                ))}
                {!products && <div>No products found</div>}
            </div>
        </main>
    );

}