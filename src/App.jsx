import Header from './header.jsx';
import { useState } from 'react';
import './PostEditor/PostEditor.jsx'
import './BlogPost/BlogPost.jsx'
import BlogList from '/Users/robertwatt/Desktop/cmu/cmuCodeCamp/nov12Assign/my-blog/src/BlogPost/BlogList.jsx'
import BlogPost from './BlogPost/BlogPost.jsx';
import { posts } from '/Users/robertwatt/Desktop/cmu/cmuCodeCamp/nov12Assign/my-blog/src/data/posts.js'
import "/Users/robertwatt/Desktop/cmu/cmuCodeCamp/nov12Assign/my-blog/src/App.css"
import PostEditor from './PostEditor/PostEditor.jsx';
function App() {
  let initialPosts = posts
 

  const [pagePosts, setPagePosts] = useState( initialPosts );
  
  const handlePostCreate = (newPost) => {
    newPost["id"] = pagePosts[pagePosts.length - 1]["id"] + 1
    newPost["date"] = new Date().toISOString()
    newPost["author"] = "Robert Watt"
    setPagePosts(prevPosts => [...prevPosts, newPost])
  };

  return (
    <div className="app">
      <Header />
      <main>
        <BlogList posts = {pagePosts}/>
        <PostEditor handlePostCreate={handlePostCreate}/>

      </main>
    </div>
  );
}

export default App;

