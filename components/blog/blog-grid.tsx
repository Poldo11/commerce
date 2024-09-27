'use client'; // Ensure this component can run on the client side

import { PortableText } from '@portabletext/react';
import sanityClient from 'app/sanityClient';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { urlFor } from 'sanity';

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  date: string;
  featuredMedia: {
    asset: {
      url: string;
    };
  };
  excerpt: any; // Sanity PortableText for the excerpt
  author: {
    name: string;
  };
}

export default function BlogGrid() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post" && status == "publish"] {
        _id,
        title,
        slug,
        date,
        featuredMedia{
          asset->{
            url
          }
        },
        excerpt,
        author->{
          name
        }
      }`;
      const result = await sanityClient.fetch(query);
      setPosts(result);
    };

    fetchPosts();
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold text-center">Revista Aboio</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <div key={post._id} className="flex flex-col items-center p-4 bg-white border rounded-lg shadow-md hover:shadow-lg">
            {/* Featured Image */}
            {post.featuredMedia?.asset?.url && (
              <Image
                src={urlFor(post.featuredMedia).url()}
                alt={post.title}
                width={500}
                height={500}
                className="rounded-t-lg h-[200px] object-cover w-full"
              />  
            )}
            {/* Post Title */}
            <h2 className="mt-4 text-xl font-bold text-center">
              <Link href={`/post/${post.slug.current}`}>
                {post.title}
              </Link>
            </h2>
            {/* Post Excerpt */}
            <div className="mt-2 text-sm text-gray-600">
              <PortableText value={post.excerpt} />
            </div>
            {/* Author */}
            <p className="mt-4 text-sm text-gray-500">By {post.author.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
