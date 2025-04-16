//components/custom/navbar.tsx
"use client"
import { X, Menu, Trophy, User, ShoppingCart } from "lucide-react";
import Search from "@/components/custom/search";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const { user, isLoading, signOut } = useAuth();
    const { cart } = useCart();

    return (
        <nav className="flex flex-col">
            <div className="flex justify-between items-center gap-2 pt-2 pr-2  relative">
                <div className="flex items-center gap-2">
                    <Menu width={32} height={32} className="md:hidden ml-2" onClick={() => setMenuOpen(true)} />
                    <div className="flex items-center gap-2">
                        <Trophy width={32} height={32} />
                        <Link className=" font-bold" href="/">Breizh Sports</Link>
                    </div>
                </div>


                {menuOpen &&
                    <div className={`absolute w-full h-screen p-2 gap-4 overflow-hidden flex-col top-0 bg-background z-50 `}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Trophy width={32} height={32} />
                                <span className=" font-bold">Breizh Sports</span>
                            </div>
                            <X width={32} height={32} onClick={() => setMenuOpen(false)} />
                        </div>
                        <div className="flex flex-col">
                            <Link href="#">Test</Link>
                            <Link href="#">Test</Link>
                            <Link href="#">Test</Link>
                            <Link href="#">Test</Link>
                            <Link href="#">Test</Link>
                            <Link href="#">Test</Link>
                            <Link href="#">Test</Link>
                            <Link href="#">Test</Link>
                            <Link href="#">Test</Link>
                            <Link href="#">Test</Link>
                        </div>

                    </div>
                }
                <div className="flex gap-2">
                    {!user &&
                        <div className="flex items-center gap-2">
                            <Link href="/signin" className="hidden md:flex">Log In</Link>
                            <Link href="/register" className="hidden md:flex">Register</Link>
                        </div>
                    }
                    {user &&
                        <div className="nav-profile-dropdown relative">
                            <User width={32} height={32} />
                            <div className="nav-profile-content absolute hidden flex-col gap-2 z-50 right-0 bg-card rounded-lg border text-left w-48">
                                <span>Bonjour {user.username} !</span>
                                <Link href="/profile" className="flex items-center gap-2 border-b hover:bg-gray-500">Mon Profil</Link>
                                <Link href="/orders" className="flex items-center gap-2 border-b hover:bg-gray-500">Mes Commandes</Link>
                                <Link href="/addresses" className="flex items-center gap-2 border-b hover:bg-gray-500">Mes Adresses</Link>
                                <Link href="/wishlist" className="flex items-center gap-2 border-b hover:bg-gray-500">Ma Liste de Souhaits</Link>
                                <Link href="/notifications" className="flex items-center gap-2 border-b hover:bg-gray-500">Mes Notifications</Link>
                                <Link href="/help" className="flex items-center gap-2 border-b hover:bg-gray-500">Aide</Link>
                                <button onClick={signOut} className="bg-destructive text-destructive-foreground rounded-lg">Log Out</button>
                            </div>
                        </div>
                    }
                    <Link href={"/cart"} className="flex items-center gap-2 relative">
                        <ShoppingCart width={32} height={32} />
                        {cart.length > 0 && <span className="">{cart.reduce((total, item) => total + item.quantity, 0)}</span>}
                    </Link>
                </div>
            </div>
            <div className="p-2">
                <Search placeholder="Search for a product..." />
            </div>
        </nav >
    )
}