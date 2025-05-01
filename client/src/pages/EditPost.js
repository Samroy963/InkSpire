import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BASE_URL from "./config"; 

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [cover, setCover] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/post/` + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) return <Navigate to={"/post/" + id} />;

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:4000/post/${id}`, {
        method: "DELETE",
        credentials: "include", // important for sending auth cookie
      });

      navigate("/"); // redirect to homepage after delete
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <form onSubmit={updatePost}>
          <h2 className="form-heading">Edit Your Shared Post</h2>
          <input
            type="text"
            className="titlePost"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="summaryPost"
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <input
            className="filePost"
            type="file"
            onChange={(e) => setFiles(e.target.files)}
          />
          <textarea
            className="textPost"
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
          />
          <button className="submit-button" type="submit">
            Update Post
          </button>
          <button className="delBtn" type="button" onClick={handleDelete}>
            Delete Post
          </button>
        </form>
      </div>
    </>
  );
}
