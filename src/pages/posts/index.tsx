"use client"
import Image from 'next/image';
import { client } from '../../utils/sanity/client';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import { useState } from 'react';
import CategoryFilter from '../../../components/categoryFilter'; // Import the CategoryFilter component

import PortableText from "react-portable-text";

import { GetServerSideProps } from 'next';
// import CategoryFilter from '../../../components/categoryFilter';


type Category = {
  _id: string;
  title?: string;
};

type Post = {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
  publishedAt?: string;
  _updatedAt?: string;
  categories?: Category[];
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  author?: { name?:string, image?:{asset: {
    _ref: string;
  };} };
  body?: [];
  // body?:[];
  leadingTxt?: [];
};

function urlFor(source) {
  // console.log("source",source); // Log the source object
  return imageUrlBuilder(client).image(source.asset._ref);
}



// const BlogPage: React.FC<{ posts: Post[] }> = ({ posts }) => {
const BlogPage: React.FC<{ posts: Post[], allCategoryTitles: string[] }> = ({ posts, allCategoryTitles }) => {
  // console.log("post in blog", posts);

  // Function to format date
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }

  // Initialize categoryPosts with 'All' as the default category
  const [categoryPosts, setCategoryPosts] = useState<{ [key: string]: Post[] }>({
    'View All': posts,
    ...allCategoryTitles.reduce((acc, category) => {
      acc[category] = posts.filter(post => post.categories?.some(cat => cat.title === category));
      return acc;
    }, {})
  });
  // console.log("CategoryPosts", categoryPosts);

  // initializes the selectedCategory state variable with the value 'All', indicating that initially, all blog posts are displayed.
  const [selectedCategory, setSelectedCategory] = useState('View All');

  const [loadedPosts, setLoadedPosts] = useState({
    'View All': 3,
    'Focus': 3,
    'Achieve': 3,
    'Progress': 3,
    'Empowerment': 3,
    'Persistence': 3,
    'Success': 3,

    // Set initial loaded posts for each category
  });

  const handleLoadMore = () => {
    setLoadedPosts(prevState => ({
      ...prevState,
      [selectedCategory]: prevState[selectedCategory] + 3, // Load 3 more posts
    }));
  };

  // Get the posts for the selected category
  const filteredPosts = categoryPosts[selectedCategory].slice(0, loadedPosts[selectedCategory]);
  // console.log("filteredPost", filteredPosts);
  // console.log({posts})

  return (
    <>
      <div className="w-full mt-0">
        <div className='blogContainer sm:bg-white bg-zinc-100'>
          <div className='w-full sm:bg-white bg-zinc-100'>
            <section className="sm:mb-28 mb-8 mt-8  ">
              <h1 className="blogHero">Blog</h1>
            </section>
          </div>
          <div className='categoryContainer '>
            {/* Category Filters */}
            <CategoryFilter
              categories={Object.keys(categoryPosts)}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
           
          </div>
          <div className="blogPost">
            <ul>
              {filteredPosts.map((post, index) => (
                <li key={post._id} className=''> {/* Ensure each key is unique */}
                  {index === 0 ? (
                    <ul key={`${post._id}-nested`} className='md:p-6 px-4 pt-3 pb-8'> {/* Add a unique key */}
                      {/* Accessing the element at index 0 */}
                      {filteredPosts.length > 0 && (
                        <li key={`${post._id}-inner`} className='md:gap-y-32 md:gap-x-32 gap-y-5'> {/* Add a unique key */}
                          {/* Rendering for index 0 */}
                          {/* <Link href={`/blog/${post.slug && post.slug.current}`} className="group"> */}
                            <Link href="/" className="group">

                            {post.mainImage && post.mainImage.asset ? (
                              <Image className="md:h-80 h-60 object-cover rounded-lg"
                                src={urlFor(post.mainImage).width(320).height(240).fit('max').auto('format').url()} width={720} height={480}
                                alt="Placeholder Image"
                                unoptimized={true}
                                priority={true}
                              />
                            ) : (
                              <Image
                                src="/images/NoImage.png"
                                alt="Placeholder Image"
                                className="md:h-80 h-60 object-cover rounded-lg"
                                width={720}
                                height={480}
                                unoptimized={true}
                              />
                            )}
                            <div className="content1">
                              <div className="flex flex-col items-start md:gap-y-1">
                                <div className="text-blue-700 text-sm font-medium leading-6 break-words">
                                  {post.categories && post.categories.length > 0 && (
                                    <ul className="flex flex-wrap uppercase">
                                      {post.categories.map((category) => (
                                        <li key={category._id}>{category.title}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                                <div className="content1Title">{post.title}</div>
                              </div>
                              <div className="contentSubTitle">
                                AngelList helps startups extend competitive job offers and manage team compensation.
                              </div>
                              <div className="date">
                                <Image src="/images/img_calendar.svg" width={720} height={480} alt="november_152022" className="h-4 w-4 mr-2" unoptimized={true} />
                                <div className="dateFull">{post.publishedAt ? formatDate(post.publishedAt) : ''}</div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <div key={`${post._id}-outer`} className='md:mt-8'> {/* Add a unique key */}
                      {/* Rendering for indexes other than 0 */}
                      {/* <Link className="group" href={`/blog/${post.slug && post.slug.current}`}> */}
                        <Link className="group" href={"/"}>

                        <div className="blogPost2">
                          {post.mainImage && post.mainImage.asset ? (
                            <Image
                              className="blogPost2_Img"
                              src={urlFor(post.mainImage).width(320).height(240).fit('max').auto('format').url()}
                              width={720}
                              height={480}
                              alt="Main Image"
                              unoptimized={true}
                            />
                          ) : (
                            <Image
                              src="/images/NoImage.png"
                              alt="Placeholder Image"
                              className="blogPost2_Img"
                              width={720}
                              height={480}
                              unoptimized={true}
                            />
                          )}
                          <div className="content2 ">
                            <div className=" content2_cat ">
                              {post.categories && post.categories.length > 0 && (
                                <ul>
                                  {post.categories.map((category) => (
                                    <li key={category._id}>{category.title}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            <div className=" content2_title">{post.title}</div>
                            <div className="contentSubTitle overflow-hidden line-clamp-3 decor">
                              {/* Our AI analyzes your goals and guides you to formulate them in the Spnecific,
                               Measurable, Achievable, Relevant, and Time-bound (SMART) format for greater success. */}
                              {/* (console.log(post.body)); */}
                              {/* {post.leadingTxt}; */}
                              <PortableText
                                content={post?.body || []}
                                serializers={{
                                  normal: (props) => (<p className="">{props.children}</p>),
                                  image: (props) => (
                                    <img
                                      className=""
                                      src={urlFor(props).url()} width={20} height={50}
                                    />
                                  ),

                                  // normal: (props, index) => (
                                  //   <p className={`${index === 0 ? 'overflow-hidden line-clamp-5' : ''}`}>
                                  //     {props.children}
                                  //   </p>
                                  // ),
                                }}
                              />
                              {/* <PortableText
                                  content={post?.body || []}
                                  serializers={{
                                    normal: (props, index, array) => {
                                      // Find the first paragraph block
                                      const firstParagraph = array.find(
                                        (block) => block._type === 'block' && block.style === 'normal'
                                      );

                                      // Return only the content of the first paragraph
                                      return firstParagraph ? (
                                        <p className={`${index === 0 ? 'overflow-hidden line-clamp-5' : ''}`}>
                                          {firstParagraph.children}
                                        </p>
                                      ) : null;
                                    },
                                  }}
                                /> */}
                            </div>
                            <div className="date ">
                              <Image src="/images/img_calendar.svg" width={0} height={100} alt="november_152022" className="h-4 w-4 mr-2" unoptimized={true} />
                              <div className="dateFull w-56 ">
                                {post.publishedAt ? formatDate(post.publishedAt) : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* for laod more  */}
          {filteredPosts.length < categoryPosts[selectedCategory].length && (
            <div className="w-auto h-auto py-10 md:my-8 md:flex flex-col justify-start items-center">
              <div className="px-8 py-4 text-white-A700 bg-slate-700 rounded-lg flex justify-center items-center gap-x-4">
                <button onClick={handleLoadMore} className="text-white text-base font-sans font-medium leading-6 break-words">Load more</button>
              </div>
            </div>
          )}
          {/* Message indicating the end of posts */}
          {filteredPosts.length >= categoryPosts[selectedCategory].length && (
            <div className="text-center my-8">
              <p className="text-gray-500">You've reached the end of the posts.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;



export const getServerSideProps: GetServerSideProps = async () => {
    const posts: Post[] = await client.fetch<Post[]>(`
      *[_type == "post"]
      { _id,
         title, slug, publishedAt, mainImage, 
         "categories": categories[]->{
          _id,
          title,
          },
        body,
      }
      |order(publishedAt desc)`);
  // console.log(posts);
  // console.dir(posts, { depth: 3 });
  // Extracting category titles from posts
  const allCategoryTitles = posts.reduce<string[]>((acc, post) => {
    post.categories?.forEach((category) => {
      if (category.title && !acc.includes(category.title)) {
        acc.push(category.title);
      }
    });
    return acc;
  }, []);
  // console.log("All Category list", allCategoryTitles)
  return {
    props: {
      posts,
      allCategoryTitles,
    },
  };
}



// export async function getServerSideProps(context) {
//   const { slug = '' } = context.params;
//   const post = await client.fetch(query, { slug });
//   return {
//     props: {
//       post
//     }
//   };
// }

// export const getServerSideProps = (async () => {
//   const Query = `
//   *[_type == "post" && defined(slug.current)]
//   { _id,
//      title, slug, publishedAt, mainImage, 
//      "categories": categories[]->{
//       _id,
//       title,
//       },
//     body,
//   }
//   |order(publishedAt desc)`
//   // const { slug = '' } = context.params;


//   const posts: Post[] = await client.fetch<Post[]>(Query);
//   // console.log(posts);
//   // console.dir(posts, { depth: 3 });
//   // Extracting category titles from posts
//   const allCategoryTitles = posts.reduce<string[]>((acc, post) => {
//     post.categories?.forEach((category) => {
//       if (category.title && !acc.includes(category.title)) {
//         acc.push(category.title);
//       }
//     });
//     return acc;
//   }, []);
//   // console.log("All Category list", allCategoryTitles)

//   return {
//     props: {
//       posts : posts ?? [],
//       allCategoryTitles : allCategoryTitles ?? [],
//     },
//   };
// }) satisfies GetServerSideProps<{ posts: Post[], allCategoryTitles: string[] }>



// export async function getStaticProps() {
  
  
//   const posts: Post[] = await client.fetch<Post[]>(`
//       *[_type == "post" && defined(slug.current)]
//       { _id,
//          title, slug, publishedAt, mainImage, 
//          "categories": categories[]->{
//           _id,
//           title,
//           },
//         body,
//       }
//       |order(publishedAt desc)`);
//   // console.log(posts);
//   // console.dir(posts, { depth: 3 });
//   // Extracting category titles from posts
//   const allCategoryTitles = posts.reduce<string[]>((acc, post) => {
//     post.categories?.forEach((category) => {
//       if (category.title && !acc.includes(category.title)) {
//         acc.push(category.title);
//       }
//     });
//     return acc;
//   }, []);
//   // console.log("All Category list", allCategoryTitles)
//   return {
//     props: {
//       posts,
//       allCategoryTitles,
//     },
//   };
// }