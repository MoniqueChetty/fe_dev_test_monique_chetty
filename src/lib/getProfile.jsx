export default async function getProfile() {
  try {
    const response = await fetch("/api/profile");
    if (!response.ok) {
      throw new Error("Could not find profile");
    }
    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while fetching the profile");
  }
}
