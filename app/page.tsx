import BlogGrid from 'components/blog/blog-grid';
import NineItems from 'components/grid/nine-items';
import Footer from 'components/layout/footer';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
    <NineItems />
    <BlogGrid />
    <Footer />
    </>
  );
}
