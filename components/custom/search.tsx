"use client"
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import SearchAction from "@/actions/search/search";
import { IProduct } from "@/types/types";
import Link from "next/link";

export default function Search({ placeholder = "Search..." }: { placeholder?: string }) {
    const [search, setSearch] = useState('')
    const [searchProducts, setSearchProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)

    const handleSearch = async (value: string) => {
        setSearch(value)
        if (value.length >= 3) {
            setLoading(true)
            try {
                const results = await SearchAction(value)
                console.log("Résultats de recherche:", results)
                setSearchProducts(results || [])
            } catch (error) {
                console.error("Erreur de recherche:", error)
                setSearchProducts([])
            } finally {
                setLoading(false)
            }
        } else {
            setSearchProducts([])
        }

    }

    return (
        <div className="relative">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                <SearchIcon className="h-4 w-4" />
            </div>
            <Input
                id="search"
                type="search"
                value={search}
                placeholder={placeholder}
                className="w-full rounded-lg bg-background pl-8"
                onChange={(e) => handleSearch(e.target.value)}
            />
            {search.length >= 3 && (
                <div className="absolute left-0 top-full mt-1 w-full bg-background rounded-lg border shadow-lg z-10">
                    {loading ? (
                        <div className="p-2 text-center">Recherche en cours...</div>
                    ) : (
                        <div className="max-h-60 overflow-auto py-1 flex flex-col">
                            {searchProducts && searchProducts.length > 0 ? (
                                searchProducts.map((product: IProduct) => (
                                    <Link key={product.documentId} href={`/product/${product.slug}`} className="px-3 py-2 hover:bg-accent cursor-pointer">
                                        <span>{product.name}</span>
                                    </Link>
                                ))
                            ) : (
                                <span className="px-3 py-2 text-muted-foreground">Aucun résultat trouvé</span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}