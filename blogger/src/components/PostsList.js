import React from 'react';
import PostItem from './PostItem';

function PostsList({list}) {
    return (
        <ul>
            {list.map(post => {
                return <PostItem key={post.id} post={post}></PostItem>
            })}
        </ul>
    );
}

export default PostsList;
