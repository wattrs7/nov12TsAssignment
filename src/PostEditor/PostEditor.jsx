import { useState, useEffect } from 'react';
import './PostEditor.css';
import TagInput from '/Users/robertwatt/Desktop/cmu/cmuCodeCamp/nov12Assign/my-blog/src/TagInput/TagInput.jsx'
import '/Users/robertwatt/Desktop/cmu/cmuCodeCamp/nov12Assign/my-blog/src/RichTextEditor/RichTextEditor.jsx'
import ReactMarkdown from 'react-markdown';


function PostEditor({ handlePostCreate }) {

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [],
    category: 'general',
    isPublished: false
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const [previewImage, setPreviewImage] = useState(null)


  const toggleHover = () => {
    setIsHovering((prev) => !prev);
  }

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return value.trim().length < 5 
          ? 'Title must be at least 5 characters' 
          : '';
      case 'content':
        return value.trim().length < 100 
          ? 'Content must be at least 100 characters' 
          : '';
      case 'tags':
        return value.length === 0 
          ? 'At least one tag is required' 
          : '';
      default:
        return '';
    }
  };

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    const updatedFormData={
      ...formData, 
      [name]:newValue,
    };
    setFormData(updatedFormData)

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFormData))

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

   /* setIsDirty(prev => ({
      ...prev,
      [name]: true
    }));

    if (isDirty[name]) {*/
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, newValue)
      }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
    
      console.log("form submission triggered");
    
      // Validate all fields
      const newErrors = {};
      Object.keys(formData).forEach(key => {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      });
    
      setErrors(newErrors);
    
      if (Object.keys(newErrors).length === 0) {
        // Form is valid, handle submission
        if (formData.isPublished) {
          // Publish immediately
          console.log('Form submitted and published:', formData);
          handlePostCreate(formData); // Assuming this function handles the actual post creation.
        } else {
          // Save as draft
          console.log('Saving draft:', formData);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData)); // Save draft to local storage
        }
      }
    };

  const  LOCAL_STORAGE_KEY = 'postEditorDraft';
  //load draft from storage upon mount
  useEffect (() => {
    const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(savedDraft){
      setFormData(JSON.parse(savedDraft))
    }
  },[])

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result); // Update preview image state
      };
      reader.readAsDataURL(file); // Read the uploaded file as a data URL
    }
  };
  


  return (
    <form onSubmit={handleSubmit} className="post-editor">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="content">Content *</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          onBlur={handleBlur}
          rows="10"
          className={errors.content ? 'error' : ''}
        />
        {errors.content && <span className="error-message">{errors.content}</span>}
      </div>

      <TagInput
        tags={formData.tags}
        onChange={tags => handleChange({ 
          target: { name: 'tags', value: tags } 
        })}
        onBlur={() => handleBlur({ target: { name: 'tags', value: formData.tags } })}
        error={errors.tags}
      />

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="travel">Travel</option>
        </select>
      </div>

      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          Publish immediately
        </label>
      </div>

      <div className="form-group preview">
        <h3>Markdown Preview</h3>
        <ReactMarkdown>{formData.title}</ReactMarkdown> {/* Highlighted line - render Markdown content */}
      </div>
      
      <div className="form-group">
        <label htmlFor="image">Upload an Image</label>
        <input type="file" name="image" id="image" accept="image/*" onChange={handleImageUpload}/>
          {errors.image && <span className = "error-message">{errors.image}</span>}
          {previewImage &&(<div className = "image-preview"> <img src={previewImage} alt="" /></div>)} 
      </div>


      <button type="submit" className="submit-button" >
        {formData.isPublished ? 'Publish Post' : 'Save Draft'}
      </button>
      <button className="preview-button" onMouseEnter ={()=>setIsHovering(true)} 
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!isHovering) setHovering(false);
                }, 200);
              }}>Preview</button>
        {/* Modal displayed when hovering is true */}
        {isHovering && (
        <div className="modal">
          <div className="modal-content">
          <h2>Preview Your Post</h2>
            <p><strong>Title:</strong> {formData.title || 'No title entered yet'}</p>
            <p><strong>Content:</strong> {formData.content || 'No content entered yet'}</p>
            <p><strong>Tags:</strong> {formData.tags.length ? formData.tags.join(', ') : 'No tags added yet'}</p>
            <p><strong>Category:</strong> {formData.category}</p>
            <p><strong>Status:</strong> {formData.isPublished ? 'Ready to Publish' : 'Draft'}</p>
            <button onClick={toggleHover}>Close</button>
          </div>
        </div>
      )}

    </form>
  );
}

export default PostEditor;

