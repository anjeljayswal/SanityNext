// // Import the createClient function from the @sanity/client package
// import { createClient } from '@sanity/client';

// // Create a new Sanity client instance
// const client = createClient({
//   projectId: 'aq5unfcg', // Your Sanity project ID
//   dataset: 'production', // Your dataset name
//   apiVersion: '2024-01-01', // API version (optional)
//   useCdn: true // Use CDN (optional)
// });

// // Export the client instance
// export default client;


// ./src/utils/sanity/client.ts
import {createClient} from 'next-sanity'

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // "df7tslvm"
const projectId = "df7tslvm"

const dataset = "production" // "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
})

