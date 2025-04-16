"use client"

import { useCart } from "@/hooks/useCart";
import { IExtendedProduct } from "@/types/types";
import Image from "next/image";
import { useState } from "react";

export default function ProductPres({ product }: { product: IExtendedProduct }) {

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = () => {
        const cartItem = {
            id: product.defaultVariant.sku,
            name: product.name,
            price: product.defaultVariant.price,
            quantity: quantity,
        };
        addToCart(cartItem);
    }

    return (
        <div className="flex">
            <div className="w-1/2 flex justify-center items-center">
                <Image width={512} height={512} src={product.defaultVariant.images ? `${strapiUrl}/${product.defaultVariant.images[0].url}` : 'https://placehold.co/800x800.png'} alt={""} />
            </div>
            <div className="w-1/2 flex flex-col justify-center items-start gap-4 p-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-lg">{product.description}</p>
                <span className="text-xl font-semibold">{product.defaultVariant.price}€</span>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="quantity" className="text-lg">Quantity</label>
                        <input type="number" id="quantity" name="quantity" min={1} defaultValue={1} className="border rounded p-2" onChange={(e) => setQuantity(Number(e.target.value))} />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleAddToCart()}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
