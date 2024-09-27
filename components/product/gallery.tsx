'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { GridTileImage } from 'components/grid/tile';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import Image from 'next/image';
import { useState } from 'react';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName = clsx(
    'h-full px-6 transition-transform transform ease-in-out hover:scale-110 flex items-center justify-center text-neutral-500 hover:text-blue-600 dark:hover:text-white'
  );

  // Fetch dominant color and set a background for aesthetic consistency
  const [bgColor, setBgColor] = useState<string>('#f0e5d6'); // Set the background color

  const imageUrlWithCacheBuster = `${images[imageIndex]?.src}?v=${new Date().getTime()}`;

  return (
    <form>
      <div className={clsx("relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-lg")} style={{ backgroundColor: bgColor }}>
        {images[imageIndex] && (
          <div className="flex items-center justify-center h-full w-full">
            <Image
              className="object-contain" // Ensure image fits within the container
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt={images[imageIndex]?.altText as string}
              src={imageUrlWithCacheBuster}
              priority={true}
            />
          </div>
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[10%] flex w-full justify-between px-4">
            <button
              formAction={() => {
                const newState = updateImage(previousImageIndex.toString());
                updateURL(newState);
              }}
              aria-label="Previous product image"
              className={buttonClassName}
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <button
              formAction={() => {
                const newState = updateImage(nextImageIndex.toString());
                updateURL(newState);
              }}
              aria-label="Next product image"
              className={buttonClassName}
            >
              <ArrowRightIcon className="h-6 w-6" />
            </button>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="my-8 flex items-center justify-center gap-3 overflow-auto">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="h-20 w-20">
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateURL(newState);
                  }}
                  aria-label="Select product image"
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                    isInteractive
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
