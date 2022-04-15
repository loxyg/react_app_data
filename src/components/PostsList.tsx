import React, { useState, useEffect } from 'react'
import { getPosts } from '../api/post'
import { Post } from '../api/types'
import { User } from '../api/types'
import { getAllUser } from '../api/user'
import PostItem from './PostItem'


const PostsList = () => {
    const [posts, setPosts] = useState<Array<Post>>([])
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<Array<User>>([])

    async function _getposts(){
        console.log("Affichage des posts");
        const data = await getPosts();
        setPosts(data);
    }

    useEffect(() => {
      _getposts();
    }, []);

    async function _getAllUsers() {
        console.log("useEffect");
        const data = await getAllUser();
        setUsers(data);
    }

    useEffect(() => {
        _getAllUsers();
    }, [])


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

    return (
   <> <ul className="post-list">{posts.map(renderItem)}</ul>
      <nav className="pagination is-centered is-small" role="navigation" aria-label="pagination">
      <a className="pagination-previous">Previous</a>
      <a className="pagination-next">Next page</a>
      <ul className="pagination-list">
        <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
        <li><span className="pagination-ellipsis">&hellip;</span></li>
        <li><a className="pagination-link" aria-label="Goto page 45">45</a></li>
        <li><a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
        <li><a className="pagination-link" aria-label="Goto page 47">47</a></li>
        <li><span className="pagination-ellipsis">&hellip;</span></li>
        <li><a className="pagination-link" aria-label="Goto page 86">86</a></li>
  </ul>
</nav>
   </>)
    
}

export default PostsList
