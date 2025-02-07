'use client';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function SearchContent({
  placeholder = 'Search...',
}: {
  placeholder?: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='relative'>
      <div className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground'>
        <SearchIcon className='h-4 w-4' />
      </div>
      <Input
        id='search'
        type='search'
        placeholder={placeholder}
        className='w-full rounded-lg bg-background pl-8'
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

export default function Search(props: { placeholder?: string }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent {...props} />
    </Suspense>
  );
}
