import React, { useState, useEffect } from 'react'
import { getPosts } from '../api/post'
import { Post } from '../api/types'
import PostItem from './PostItem'


const PostsList = () => {
    const [posts, setPosts] = useState<Array<Post>>([])
    const [loading, setLoading] = useState(false)

    async function _getposts(){
        console.log("Affichage des posts");
        const data = await getPosts();
        setPosts(data);
    }

    useEffect(() => {
      _getposts();
    }, []);

    function renderItem(values: Post) {
        return (
            <div key={values.id}>
                <PostItem {...values} />
            </div>
        )
    }

    if (loading) {
        return (
            <section className="hero">
                <div className="hero-body">
                    <p className="title">Loading ...</p>
                </div>
            </section>
        )
    }

    if (posts.length === 0) {
        return (
            <section className="hero">
                <div className="hero-body">
                    <p className="title">No Posts</p>
                </div>
            </section>
        )
    }

    return <ul className="post-list">{posts.map(renderItem)}</ul>
}

export default PostsList
