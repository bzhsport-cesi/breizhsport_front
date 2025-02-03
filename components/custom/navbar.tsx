"use client"
import { X, Menu, Trophy, User, ShoppingCart } from "lucide-react";
import Search from "@/components/custom/search";
import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false)


    return (
        <nav className="flex flex-col">
            <div className="flex justify-between items-center gap-2 pt-2 pr-2  relative">
                <div className="flex items-center gap-2">
                    <Menu width={32} height={32} className="md:hidden ml-2" onClick={() => setMenuOpen(true)} />
                    <div className="flex items-center gap-2">
                        <Trophy width={32} height={32} />
                        <span className=" font-bold">Breizh Sports</span>
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
                    <User width={32} height={32} />
                    <ShoppingCart width={32} height={32} />
                </div>
            </div>
            <div className="p-2">
                <Search placeholder="Search for a product..." />
            </div>
        </nav >
    )
}