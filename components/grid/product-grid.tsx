"use client"; // Ensure this is marked as a Client Component

import { PlusIcon } from '@heroicons/react/24/outline'; // For the add-to-cart icon
import { useCart } from 'components/cart/cart-context'; // Import the cart context
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';
import { startTransition, useState } from 'react'; // Import startTransition from React
import { Toaster, toast } from 'react-hot-toast'; // Import toast for feedback

interface ProductGridProps {
  initialProducts: Product[];
}

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(9); // Number of products to display
  const [products, setProducts] = useState<Product[]>(initialProducts); // State for products
  const { addCartItem } = useCart(); // Get cart actions from the context

  // Function to add a product to the cart
  const handleAddToCart = (product: Product) => {
    const defaultVariant = product.variants[0]; // Assuming the first variant is the default

    if (defaultVariant) {
      startTransition(() => {
        try {
          addCartItem(defaultVariant, product); // Use addCartItem from the cart context
          toast.success(`${product.title} has been added to your cart.`);
        } catch (error) {
          console.error('Failed to add product to cart:', error);
          toast.error(`Failed to add ${product.title} to your cart.`);
        }
      });
    } else {
      toast.error(`Unable to add ${product.title} to your cart.`);
    }
  };

  function handleLoadMore() {
    setVisibleCount((prevCount) => prevCount + 9); // Load more products
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="py-8">
        <h1 className="mb-4 text-3xl font-bold text-center">Tudo</h1>
      </div>

      {/* Display products in a responsive grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.slice(0, visibleCount).map((product) => (
          <div 
            key={product.handle} 
            className="relative flex flex-col p-4 bg-white border rounded-lg shadow-sm hover:shadow-md"
          >
            <Link
              className="relative h-full w-full flex items-center justify-center" // Center the image
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              {/* Container to maintain 1:1 aspect ratio */}
              <div
                className="w-full relative pb-full bg-[#f0e5d6] flex items-center justify-center overflow-hidden rounded-lg"
              >
                <GridTileImage
                  alt={product.title}
                  src={product.featuredImage?.url}
                  className="object-contain h-full w-full"
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                />
              </div>
            </Link>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => handleAddToCart(product)} // Add to Cart functionality
                className="p-2 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700"
                aria-label="Add to Cart"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Product Details */}
            <div className="pt-4">
              <p className="text-lg text-black font-bold text-center">R$ {product.priceRange.maxVariantPrice.amount}</p>
              <p className="text-center text-black text-sm">{product.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {products.length > visibleCount && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            Veja mais
          </button>
        </div>
      )}
    </div>
  );
}
