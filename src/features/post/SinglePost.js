import { useSelector, useDispatch } from "react-redux";
import { selectPostById } from "./postSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePost = () => {
    //retrieve single post 
    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if(!post) {
        return (
            <h2>Post not found</h2>
        )
    }

  return (
    <div className="card mt-3">
      <div className="card-body">
          <h1>{post.title}</h1>
          <p>{post.body.substring(0, 100)}</p>
          <h3><PostAuthor userId={post.userId} /></h3>
          <p><TimeAgo timestamp={post.date}/></p>
          <Link to={`/post/${post.id}/edit`}>Edit Post</Link>
          <ReactionButton post={post}/>
      </div>
    </div>
  )
}

export default SinglePost