import PropTypes from 'prop-types';
import BlogPost from './BlogPost.jsx';
import './BlogList.css';

function BlogList({ posts }) {
  return (
    <div className="blog-list">
      {posts.map(post => (
        <BlogPost
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          date={post.date}
          readTime={post.readTime}
        />
      ))}
    </div>
  );
}
/*
BlogList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.required,
      id: PropTypes.number.required,
      title: PropTypes.string.required,
      content: PropTypes.string.required,
      author: PropTypes.string.required,
      date: PropTypes.string.required,
      readTime: PropTypes.number.required
    })
  ).required
};*/

export default BlogList;
