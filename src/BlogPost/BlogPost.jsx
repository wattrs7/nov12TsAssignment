import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentSection from '../CommentSection/CommentSection';
import LikeButton from '/Users/robertwatt/Desktop/cmu/cmuCodeCamp/nov12Assign/my-blog/src/LikeButton/LikeButton.jsx';
import { calculateReadTime } from '/src/utils/readTime';
import './BlogPost.css'


function BlogPost({title, content, author, date, id}){
    const [isExpanded, setIsExpanded] = useState(false);
    const [readTime, setReadTime] = useState(0)

    useEffect(()=>{
       let x = calculateReadTime(content)
       console.log(x)
       setReadTime(x)} , [content])

    const toggleContent =()=>{
        setIsExpanded(prev =>!prev)//wtf is that
    }

    const displayContent = isExpanded ? content: content.slice(0,200) + (content.length >200 ? '...': '')
    
    return(
            <article className="blog-post">
              <div className="blog-post__header">
                <h2 className="blog-post__title">{title}</h2>
                <div className="blog-post__meta">
                  <span className="blog-post__author">By {author}</span>
                  <time className="blog-post__date">{date}</time>
                  <span className="blog-post__read-time">{readTime} min read</span>
                </div>
              </div>
              
              <div className="blog-post__content">
                <p>{displayContent}</p>
                {content.length > 200 && (
                  <button 
                    onClick={toggleContent}
                    className="blog-post__expand"
                  >
                    {isExpanded ? 'Read less' : 'Read more'}
                  </button>
                )}
              </div>
        
              <div className="blog-post__actions">
                <LikeButton initialLikes={0} />
                 <CommentSection postId={id} />
              </div>
            </article>
          );
        }

BlogPost.PropTypes = {
    title: PropTypes.string.required,
    content: PropTypes.string.required,
    author: PropTypes.string.required,
    date: PropTypes.string.required,
    readTime: PropTypes.number.required,
    id: PropTypes.number.required
};

export default BlogPost;