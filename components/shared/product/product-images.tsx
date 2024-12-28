'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      <Image src={images[current]} alt="Product" width={1024} height={1024} className="min-h-[300px] object-cover object-center" />

      <div className="flex gap-2">
        {images.map((image, index) => (
          <div key={image} onClick={() => setCurrent(index)} className={cn('border cursor-pointer hover:border-yellow-600', current === index && 'border-yellow-500')}>
            <Image src={image} alt="image" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
