
import React from 'react'
import PostRow from '../../../components/post/PostRow'
import { Alert } from '@mui/material'
import { motion } from 'framer-motion'

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
                    posts?.map((post, idx) => {
                        return <motion.div
                            key={post.postId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx}}>
                            <PostRow post={post} saveOrUnsavePost={saveOrUnsavePost}></PostRow>
                        </motion.div>
                    })

            }
        </div>

    )
}
