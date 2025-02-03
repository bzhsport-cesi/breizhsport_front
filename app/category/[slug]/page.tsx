

export default async function Category({ params }: { params: Promise<{ slug: string }> }) {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const slug = (await params).slug;

    const response = await fetch(`${apiUrl}/categories?filters[slug][$eq]=${slug}`);
    const data = await response.json();
    console.log(data);
    return (
        <main className="">

        </main>
    );

}