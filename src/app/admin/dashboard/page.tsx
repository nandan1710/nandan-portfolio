async function handleDelete(id: number) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this WordPress post?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      `/api/wordpress/posts/${id}/delete`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Delete failed.");
      console.error(data);
      return;
    }

    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.ID !== id)
    );

    alert("Post deleted successfully.");
  } catch (error) {
    console.error(error);
    alert("Something went wrong while deleting.");
  }
}
