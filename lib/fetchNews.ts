import  { gql }   from "graphql-request";
import sortNewsByImage from './sortNewsByImage';

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    //GraphQL query
   const query = gql`
       query MyQuery(
           $access_key: String!
           $categories: String!
           $keywords: String   
       ) {
         myQuery(
             access_key: $access_key
             categories: $categories 
             countries: "gb"
             sort: "published_desc"
             keywords: $keywords
            ) {
          data {
            author
            category 
            image
            description
            country
            language
            published_at
            source
            title
            url
          }
          pagination {
            count
            limit
            offset
            total
          }
        }
      }`;


    // Fetch function with Next.js 13 caching...
    const res = await fetch('https://kaarst.stepzen.net/api/killjoy-olm/__graphql', {
        method: 'POST',
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
        headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
        },
        body: JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords,
            },
        }),
    }
);
// console.log(
//     "LOADDING NEW DATA FROM API FOR Category >>> ",
//     category,
//     keywords
// );

  const newsResponse = await res.json();

// Sort function by images vs images present
  const news = sortNewsByImage(newsResponse.data.myQuery);

// return res

  return news;
};

export default fetchNews;



 
//stepzen import curl "http://api.mediastack.com/v1/news?access_key=abc&sources=business,sports"

