import Image from "next/image";
import Link from "next/link";
const qs = require('qs');

export default async function Home() {


  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const query = qs.stringify({
    filters: {
      depth: 0,
    }
  })

  const response = await fetch(`${apiUrl}/categories?${query}`);
  const categories = await response.json();


  return (
    <main className="flex flex-col gap-4">
      <div className="w-full h-96 relative">
        <Image
          src="/images/hero.jpg"
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-4xl font-bold text-white">Welcome to Breizh Sports</h1>
          <p className="text-lg text-white">Your one stop shop for all things sports</p>
        </div>
      </div>
      <div className="p-2">
        <h2 className="font-bold text-center">Fetch our products by sport :</h2>
        <div className="grid grid-cols-2 justify-items-center gap-2">
          {categories.data.map((category: any) => (
            <div key={`category-${category.id}`} className="p-2 w-full bg-card rounded-lg border text-center">
              <Link href={`/category/${category.slug}`} >{category.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}