import BlogList from './BlogPost/BlogList.jsx';
import Header from './header.jsx';
import {posts} from './data/posts.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <BlogList posts={posts}/>
      </main>
    </div>
  );
}

export default App;

