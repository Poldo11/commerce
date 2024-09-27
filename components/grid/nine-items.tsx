import { getProducts } from 'lib/shopify';
import ProductGrid from './product-grid'; // Import the Client Component

// Function to generate metadata for SEO purposes
export async function generateMetadata() {
  return {
    title: 'All Products - My Shopify Store',
    description: 'Browse all products available in our store.',
  };
}

// Main page component to display all products (Server Component)
export default async function NineItems() {
  // Fetch initial products from Shopify (Server-side)
  const products = await getProducts({});

  return (
    <div className="mx-auto max-w-screen-2xl l:px-40 md:px-40">
      {/* Render the Client Component, passing products as props */}
      <ProductGrid initialProducts={products} />
    </div>
  );
}
