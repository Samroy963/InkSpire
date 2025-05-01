import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import BASE_URL from "./config"; 


export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();

    const response = await fetch(`${BASE_URL}/post`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) return <Navigate to="/" />;

  return (
    <>
    <div className="form-wrapper">
      <form onSubmit={createNewPost}>
      <h2 className="form-heading">Create Your Own Post</h2>
        <input
          type="text"
          className="titlePost"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="summaryPost"
          placeholder="Summary"
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <input
          className="filePost"
          type="file"
          onChange={e => setFiles(e.target.files)}
        />
        <textarea
          className="textPost"
          placeholder="Write your post content here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          rows="10"
        />
        <button className="submit-button" type="submit">Create Post</button>
      </form>
    </div>
    </>
  );
}
