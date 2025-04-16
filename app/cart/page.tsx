import CartSummary from "@/components/custom/shop/cart/cart-summary";
import Cart from "@/components/custom/shop/cart/cart-table";

export default async function CartPage() {



    return (
        <main className="flex gap-4 px-2">
            <div className="w-4/5 bg-card p-2 rounded-lg border text-center flex flex-col gap-2">
                <Cart />
            </div>
            <div className="w-1/5 bg-card p-2 rounded-lg border text-center">
                <CartSummary />
            </div>
        </main>
    )
}