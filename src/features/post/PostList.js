import { useSelector } from "react-redux";
import { selectPostIds, getPostStatus, getPostError } from "./postSlice";
import PostExcerpt from "./PostExcerpt";

const PostList = () => {

  const orderedPostIds = useSelector(selectPostIds)
  const postStatus = useSelector(getPostStatus)
  const postError = useSelector(getPostError)
 
    let content = ""
    if(postStatus === "loading") {
      content = <p>Loading.......</p>
    } else if(postStatus === "succeeded") {
      content = orderedPostIds.map(postId => <PostExcerpt key={postId} postId={postId}  /> )
    }
  return (
    <div>
        <h2 className="mt-3">Posts</h2>
        {content}
    </div>
  )
}

export default PostList;