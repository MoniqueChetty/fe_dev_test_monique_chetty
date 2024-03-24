import { useState } from "react";

function AddComment({ postId }) {
  const [commentText, setCommentText] = useState("");
  const [profileId, setProfileId] = useState(1); //default set for testing

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (commentText.trim().length < 3) {
      setError("Comment must be at least 3 characters long.");
      return;
    }
    const commentData = JSON.stringify({
      text: commentText,
      profileId: profileId,
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: commentData,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const result = await response.json();
      console.log(result);
      setCommentText("");
      alert("Comment added successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto my-2">
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment here..."
          rows="4"
          className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-full mb-2 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          required
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-gray-200 border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 shadow-md"
          >
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
