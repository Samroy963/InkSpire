import Post from "../post";
import {useEffect, useState} from "react";
import BASE_URL from "../config"; 

export default function IndexPage () {
    const [posts,setPosts] = useState([]);
    useEffect(() => {
     fetch(`${BASE_URL}/post`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
     });
    }, []);
    return (
        <>
          {posts.length > 0 && posts.map(post => (
            <Post {...post} key={post._id} />
          ))}
        </>
      );
      
}
