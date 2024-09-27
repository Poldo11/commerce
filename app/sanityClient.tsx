import { createClient } from '@sanity/client';

// Set up the client for fetching data
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // replace with your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // replace with your dataset name
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2023-09-23' // use the latest version or lock to a specific date
});

export default sanityClient;