import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';


class Blog extends Component {

    state = {
        posts : [],
        selectedPost : null,
        error : false
    }
    async componentDidMount(){
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const limitedPosts = response.data.slice(0 , 4);
            const updatedPosts = limitedPosts.map(post =>{
                return {
                    ...post ,
                    author : 'Masoud'
                }
    
            });
            this.setState({posts : updatedPosts});
            console.log(this.state.posts);
    

        }catch (error){
            this.setState({error : true});

        }
      
    }

    selectedPostHandler = (postId) => {
        this.setState({selectedPost : postId });
    }
    render () {
        let posts = <h1 style={{textAlign : "center"}}>something went wrong!</h1>
        if (!this.state.error) {
             posts = this.state.posts.map(post => {
                return <Post key={post.id}
                 title={post.title}
                  author={post.author}
                  clicked={() => this.selectedPostHandler(post.id)}/>;
            });
        }
      
        return (
            <div>
                <section className="Posts">
                  {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPost}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;