import { categories } from "../constants";
import fetchNews from "../lib/fetchNews";
import NewsList from "./NewsList";
//import response from "../response.json"


async function Homepage() {
    // fetch the news data
    const news: NewsResponse =  await fetchNews(categories.join(","));
    // response ||
    //console.log(news); 
     
    return <div>
       <NewsList news={news} />
  
       </div>
    
}

export default Homepage;
