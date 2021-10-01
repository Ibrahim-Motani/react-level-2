import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import PostsList from '../components/PostsList';

const link = `https://jsonplaceholder.typicode.com/users/`;
const postsLink = `https://jsonplaceholder.typicode.com/posts?userId=`;

function User() {
    const [userDetails, setUserDetails] = useState([]);
    const [postsDetails, setPostsDetails] = useState([]);

    const params = useParams();
    const { userId } = params;

    useEffect(() => { 
        axios.get(link + userId)
            .then(response => {
                const result = response.data;
                setUserDetails(result);
            }).catch(error => {
                console.log(error.message);
            });
    }, [userId]);

    useEffect(() => {
        axios.get(postsLink + userId) 
            .then(response => {
                const result = response.data;
                setPostsDetails(result);
            }).catch(error => {
                console.log(error.message);
            })
    }, [userId])

    
    return (
        <div>
            <h2>USER NAME : {userDetails.name}</h2>
            <h3>POSTS WRITTEN BY THE USER</h3>
            <PostsList list={postsDetails}></PostsList>
        </div>
    )
}

export default User
