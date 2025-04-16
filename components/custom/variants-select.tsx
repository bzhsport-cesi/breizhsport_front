"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"


export default function VariantsSelect({ product }: { product: any }) {
    const [selectedVariant, setSelectedVariant] = useState(product.defaultVariant)
    console.log(product.defaultVariant)


    const variants = [product.defaultVariant, product.variants].flat()
    const attributes = variants.map(variant => variant.attributes).flat()
    const attributesNames = attributes.map(attribute => attribute.name)
    const attributesValues = attributes.map(attribute => attribute.value)
    const test: Record<string, string[]> = {};

    attributes.forEach((attribute) => {
        test[attribute.name] = [...(test[attribute.name] || []), attribute.value];
    });

    console.log(test);


    return (
        <div>

        </div>
    )
}