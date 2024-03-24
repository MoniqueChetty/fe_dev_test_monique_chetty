export default async function getPosts(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`);
    if (!response.ok) {
      console.log("Could not find post");
    }
    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while fetching the post");
  }
}
