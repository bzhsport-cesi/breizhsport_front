//components/custom/navbar.tsx
"use client"
import { X, Menu, Trophy, User, ShoppingCart } from "lucide-react";
import Search from "@/components/custom/search";
import { useState } from "react";
import Link from "next/link";
import SignOutAction from "@/actions/auth/signout-action";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const { user, isLoading, signOut } = useAuth();

    console.log(user, isLoading)

    const handleSignOut = async (formData: FormData) => {
        await SignOutAction()
        redirect("/")
    }

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
                            <div className="nav-profile-content absolute hidden flex-col z-50 right-0">
                                <span>{user.username}</span>
                                <button onClick={signOut} className="bg-destructive text-destructive-foreground">Log Out</button>
                            </div>
                        </div>
                    }
                    <ShoppingCart width={32} height={32} />
                </div>
            </div>
            <div className="p-2">
                <Search placeholder="Search for a product..." />
            </div>
        </nav >
    )
}