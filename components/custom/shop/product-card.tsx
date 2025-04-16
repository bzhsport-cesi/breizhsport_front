"use client";

import { useCart } from "@/hooks/useCart";
import { IExtendedProduct } from "@/types/types";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }: { product: IExtendedProduct }) {

    const { addToCart } = useCart();

    const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    const handleAddToCart = () => {
        const item = {
            id: product.defaultVariant.sku,
            name: product.name,
            price: product.defaultVariant.price,
            quantity: 1,
        };
        console.log("Adding to cart", item);
        addToCart(item);
    }

    return (
        <div className="bg-card p-2 rounded-lg border text-center flex flex-col justify-center items-center max-w-64">
            <Link href={`/product/${product.slug}`} className="">
                <img src={!product.defaultVariant.images ? 'https://placehold.co/800x800.png' : `${backendUrl}${product.defaultVariant.images[0].url}`} />
                <span >{product.name}</span>
            </Link>
            <div className="flex justify-around w-full items-center z-50">
                <span>{product.defaultVariant.price} €</span>
                <button onClick={() => handleAddToCart()} ><ShoppingCart /></button>
            </div>

        </div>
    )
}