import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../pages/UserContext";
import { Link } from "react-router-dom";
import BASE_URL from "../config"; 

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`${BASE_URL}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";
  return (
    <div className="postPage">
      <h1 className="postpageHeading">{postInfo.title}</h1>
      <time className="postpageTime">
        {formatISO9075(new Date(postInfo.createdAt))}
      </time>
      <div className="postpageAuthor">by @{postInfo.author.username}</div>
      <div className="postPageImage">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt=""
          height={300}
          width={1250}
        />
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
