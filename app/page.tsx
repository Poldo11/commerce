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
    <Footer />
    </>
  );
}
