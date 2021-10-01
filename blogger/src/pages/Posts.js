import React, { useEffect, useState } from "react";
import axios from 'axios';
import PostsList from "../components/PostsList";
const link = `https://jsonplaceholder.typicode.com/posts`;

function Posts() {
  const [postsDetails, setPostsDetails] = useState([]);

  useEffect(() => { 
    axios.get(link)
      .then(response => {
        const result = response.data;
        setPostsDetails(result);
      }).catch(error => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Total Posts - {postsDetails.length}</h1>
      <PostsList list={postsDetails}></PostsList>
    </div>
  );
}

export default Posts;
