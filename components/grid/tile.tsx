"use client";

import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  width = 1080,
  height = 1080,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  width?: number;
  height?: number;
} & React.ComponentProps<typeof Image>) {
  const [bgColor, setBgColor] = useState<string>('#fff');

  // Add cache-busting mechanism
  const imageUrlWithCacheBuster = `${props.src}?v=${new Date().getTime()}`; // Add timestamp

  useEffect(() => {
    const fetchDominantColor = async (imageUrl: string) => {
      // Simulate dominant color fetch
      const color = '#f0e5d6'; // Placeholder color logic
      setBgColor(color);
    };

    if (typeof props.src === 'string') {
      fetchDominantColor(imageUrlWithCacheBuster); // Use updated image URL with cache buster
    }
  }, [imageUrlWithCacheBuster]);

  return (
    <div
      className={clsx(
        'group relative flex items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active,
        }
      )}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className="w-full pb-full relative" style={{ paddingBottom: '100%' }}>
        {props.src && typeof props.src === 'string' ? (
          <Image
            className={clsx('absolute inset-0 h-full w-full object-cover', {
              'transition duration-300 ease-in-out group-hover:scale-105': isInteractive,
            })}
            {...props}
            width={width}
            height={height}
            alt={props.alt || label?.title || 'Product Image'}
            src={imageUrlWithCacheBuster} // Use cache-busted image URL
          />
        ) : null}
      </div>
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
