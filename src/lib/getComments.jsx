export default async function getComments(id) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/${id}/comments`
    );
    if (!response.ok) {
      console.log("Could not find comments");
    }
    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while fetching the comments");
  }
}
