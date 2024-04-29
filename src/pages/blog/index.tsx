import React from 'react'
import Image from 'next/image'
import { client } from '../../utils/sanity/client';
import { GetServerSideProps } from 'next';
import imageUrlBuilder from "@sanity/image-url";
import utilStyles from '../../../styles/utils.module.css';


type Post = {
  title?: string,
  mainImage?: string,
  body?: [],
}
function urlFor(source: any) {
  return imageUrlBuilder(client).image(source?.asset?._ref);
}


export default function Index({ posts }) {
  // console.log(posts?.body)
  return (
    <>
    <div className={utilStyles.blog}>
    <h1>{posts[0]?.title}</h1>
      {/* <Image src={urlFor(posts[0]?.mainImage).url()} width={450} height={450} alt='main Image'/> */}

      {posts[0]?.mainImage?.asset && (
        <Image className="md:h-80 h-60 object-cover rounded-lg"
          src={urlFor(posts[0]?.mainImage).url()} width={520} height={480}
          alt="Placeholder Image"
          unoptimized={true}
          priority={true}
        />
      )}
      {/* <div>
        {posts.map((post) => (
          <li key={post._id}>
            {post.body.map((paragraph, index) => (
              <p key={index}>{post.body}</p>
            ))}
          </li>
        ))}
      </div> */}
      {/* <p>{posts?.body}</p> */}
    

    </div>
      </>
  )
}



export const getServerSideProps: GetServerSideProps = async () => {
  const posts: Post[] = await client.fetch<Post[]>(`*[_type == "post"]`);
  return {
    props: {
      posts,
    },
  };
};
