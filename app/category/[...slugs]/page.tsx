import Link from "next/link";

const qs = require('qs');


export default async function Category({ params }: { params: Promise<{ slugs: string[] }> }) {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const slugs = (await params).slugs;

    const currentUrl = "/" + slugs.join('/');

    const currentNodeQuery = qs.stringify({
        filters: {
            slug: currentUrl
        },
    }, { encodeValuesOnly: true })


    //TODO test response status & if data is empty or have more than 1 element
    const currentNodeResponse = await fetch(`${apiUrl}/categories?${currentNodeQuery}`);
    const currentNode = (await currentNodeResponse.json()).data[0];

    const childrenQuery = qs.stringify({
        filters: {
            slug: {
                $startsWith: `${currentUrl}/`,
                $notEq: `${currentUrl}`
            },
            depth: {
                $eq: currentNode.depth + 1
            }
        },
    }, { encodeValuesOnly: true })

    const childrenResponse = await fetch(`${apiUrl}/categories?${childrenQuery}`);
    const children = (await childrenResponse.json()).data;

    //TODO get products from each category (if depth = 0 -> all products etc.)
    //TODO only one api call for all (see backend route)

    return (
        <main className="p-2 flex flex-col gap-4">
            <h1 className="text-center font-bold">Check our {currentNode.name} {children.length > 0 ? 'categories' : 'products'} !</h1>
            <div className="grid grid-cols-2 gap-2">
                {children?.map((category: any) => (
                    <div className="bg-card p-2 rounded-lg border text-center" key={category.documentId}>
                        <Link href={`/category${category.slug}`}>{category.name}</Link>
                    </div>
                ))}
            </div>
        </main>
    );

}