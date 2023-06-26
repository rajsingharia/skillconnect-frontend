
import React from 'react'
import PostRow from '../../../components/post/PostRow'
import { Alert } from '@mui/material'

export default function ListOfPost({ posts, saveOrUnsavePost }) {

    //for testing adding 10 same posts
    // posts = [...posts, ...posts, ...posts, ...posts];

    return (

        <div className='list-of-post-body'>
            {
                posts && posts?.length == 0 ?
                    <div className='d-flex justify-content-center m-2'>
                        <Alert severity="info">No post found</Alert>
                    </div>
                    :
                    posts?.map((post) => {
                        return <PostRow key={post.postId} post={post} saveOrUnsavePost={saveOrUnsavePost}></PostRow>
                    })

            }
        </div>

    )
}
