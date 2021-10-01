import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Comments from '../components/Comments';

const userLink = `https://jsonplaceholder.typicode.com/users/`;
const postLink = `https://jsonplaceholder.typicode.com/posts/`;

function Post() {
    const [postDetails, setPostsDetails] = useState([]);
    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState([]);

    const params = useParams();
    const { postId } = params;
    
    useEffect(() => {
        axios.get(postLink + postId)
            .then(response => {
                const result = response.data;
                setUserId(result.userId);
                setPostsDetails(result);
            }).catch(error => {
                console.log(error.message);
            });
    }, [postId]);
    
    useEffect(() => {
        axios.get(userLink + userId)
            .then(response => {
                const result = response.data;
                setUserDetails(result);
            }).catch(error => {
                console.log(error.message);
            });
    }, [userId])

    return (
      <div>
        <h2>USER NAME : {userDetails.name}</h2>
        <h2>TITLE : {postDetails.title}</h2>
        <h3>BODY: {postDetails.body}</h3>
        <hr />
        <Comments postId={postId}></Comments>
        <hr />
        <h4>
          <Link to={`/users/${userId}`}>More posts by {userDetails.name}</Link>
        </h4>
      </div>
    );
}

export default Post;
