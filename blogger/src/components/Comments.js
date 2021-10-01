import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Comments({ postId }) {
    const [commentDetails, setCommentDetails] = useState([]);
    useEffect(() => { 
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(response => {
                const result = response.data;
                setCommentDetails(result);
            }).catch(error => {
                console.log(error.message);
            })
    }, [postId]);

    return (
      <>
        <h2>Comments</h2>
        <ul>
          {commentDetails.map(comment => {
            return <li key={comment.id}>{comment.body}</li>;
          })}
        </ul>
      </>
    );
}

export default Comments;
