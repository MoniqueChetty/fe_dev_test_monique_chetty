export default async function getPosts() {
  try {
    const response = await fetch("/api/posts.ts");
    if (!response.ok) {
      console.log("Could not find posts");
    }
    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while fetching the posts");
  }
}
