import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

// Fetching products for the carousel
export async function Carousel() {
  // Fetch products from a specific collection for the homepage carousel
  const products = await getCollectionProducts({ collection: 'homepage-carousel' });

  if (!products?.length) return null;

  // Duplicate products to make the carousel loop seamlessly and not run out on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      {/* Carousel list that scrolls horizontally */}
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={typeof product.featuredImage?.url === 'string' ? product.featuredImage.url : ''}
                width={400}  // Ensure proper sizing for carousel images
                height={400} // 1:1 aspect ratio
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
