"use client"
import { useCart } from "@/hooks/useCart";

export default function CartTable() {
    const { cart, removeFromCart, clearCart } = useCart();

    return (
        <div className="cart">
            <h2>Mon Panier</h2>
            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <div className="w-full flex flex-col gap-2">
                    <table className="table-auto text-left">
                        <thead className="border-b">
                            <tr className="">
                                <th>Produit</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                                <th>Prix total</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {cart.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td>{item.name}</td>
                                    <td>{item.price} €</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price * item.quantity} €</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <button onClick={clearCart}>Vider le panier</button>
                </div>
            )}
        </div>
    );
}