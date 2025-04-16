import ProductPres from "@/components/custom/shop/product/product-pres";
import VariantsSelect from "@/components/custom/variants-select";
import { IExtendedProduct, IStrapiAPIResponse } from "@/types/types";
import Image from "next/image";

const qs = require('qs');


export default async function Product({ params, searchParams }: Readonly<{ params: Promise<{ slug: string[] }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }>) {

    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL

    const productSlug = (await params).slug

    const productQuery = qs.stringify({
        filters: {
            slug: productSlug
        },
        populate: {
            defaultVariant: {
                populate: {
                    attributes: "*",
                    images: {
                        populate: "*"
                    }
                }
            },
            variants: {
                populate: {
                    attributes: "*",
                    images: {
                        populate: "*"
                    }
                }
            },
            category: {
                populate: "*"
            }
        }
    })


    const productResponse = await fetch(`${apiUrl}/products?${productQuery}`);
    const productData: IStrapiAPIResponse<IExtendedProduct> = (await productResponse.json());
    const product = productData.data[0]
    const category = product.category;
    const breadCrumbs = category.slug.split("/").filter(Boolean)

    return (
        <main>
            <span>{breadCrumbs?.map((crumb: string, index: number) => (
                `${crumb} > ${index === breadCrumbs.length - 1 ? product.name : ''}`
            ))}</span>
            <div>
                <ProductPres product={product} />
            </div>
        </main>
    )
}