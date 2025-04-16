// hooks/useCart.ts
import { useState, useEffect } from "react";

// Définir le type de l'article dans le panier
type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Charger le panier depuis le localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Ajouter un article au panier
    function addToCart(item: CartItem) {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            const index = newCart.findIndex((i) => i.id === item.id);
            if (index >= 0) {
                console.log(newCart[index].quantity, item.quantity);
                newCart[index].quantity += item.quantity;
            } else {
                newCart.push(item);
            }
            localStorage.setItem("cart", JSON.stringify(newCart)); // Sauvegarder dans le localStorage
            return newCart;
        });
    }

    // Supprimer un article du panier
    function removeFromCart(itemId: string) {
        setCart((prevCart) => {
            const newCart = prevCart.filter((item) => item.id !== itemId);
            localStorage.setItem("cart", JSON.stringify(newCart)); // Sauvegarder dans le localStorage
            return newCart;
        });
    }

    // Vider le panier
    function clearCart() {
        setCart([]);
        localStorage.removeItem("cart"); // Supprimer du localStorage
    }

    return {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
    };
}