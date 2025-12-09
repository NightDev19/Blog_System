import { useEffect, useState } from "react";
import { getAllPost } from "../../api/post/index.js";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getAllPost();

        if (!result || !result.success) {
          setFetchError("Backend did not return expected result.");
          setLoading(false);
          return;
        }

        setPosts(result.data);
      } catch (err) {
        setFetchError(err.message || "Fetch failed.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Defensive conditional rendering
  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (fetchError) {
    return <div style={{ color: "red" }}>Error: {fetchError}</div>;
  }

  return (
    <div>
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "6px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>
              Posted by <b>{post.username}</b> ({post.role}) — {post.status}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default PostsList;
