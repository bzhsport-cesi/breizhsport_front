"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { useState } from "react";

export default function CartSummary() {
    const [shippingMethod, setShippingMethod] = useState("home");

    const { cart } = useCart();
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + (shippingMethod === "home" ? 0 : 5); // Assuming a flat shipping fee of 5€ for point relais
    const totalHT = (cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.8).toFixed(2); // Assuming a 20% VAT rate
    const shippingFee = shippingMethod === "home" ? 0 : 5; // Assuming a flat shipping fee of 5€ for point relais



    return (
        <div className="flex flex-col gap-2 w-full">
            <h2 className="font-bold border-b">Résumé du Panier</h2>
            <div className="flex-col">
                <span>Livraison :</span>
                <div className="flex justify-evenly items-center gap-2">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="">A domicile</label>
                        <input type="radio" name="shipping" id="" onChange={() => setShippingMethod("home")} />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="">En point relais</label>
                        <input type="radio" name="shipping" id="" onChange={() => setShippingMethod("relais")} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between w-full text-sm text-gray-500">
                    <span className="">Total HT :</span>
                    <span>{totalHT} €</span>
                </div>
                <div className="flex justify-between w-full text-sm text-gray-500">
                    <span className="">TVA</span>
                    <span>20 %</span>
                </div>
                <div className="flex justify-between w-full text-sm text-gray-500">
                    <span className="">Livraison :</span>
                    <span>{shippingFee} €</span>
                </div>
                <div className="flex justify-between w-full font-bold">
                    <span className="">Total :</span>
                    <span className="">{total} €</span>
                </div>

            </div>
            <div className="flex flex-col gap-2 items-center justify-between">
                <div className="flex justify-between w-full">
                    <label htmlFor="coupon">Code promo :</label>
                    <input type="text" name="coupon" className="border rounded-lg" />
                </div>
                <Link href={"/construction"} className="bg-primary text-primary-foreground p-2 rounded-lg">Commander !</Link>
            </div>
        </div>
    )

}