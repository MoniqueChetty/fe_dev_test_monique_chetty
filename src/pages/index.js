import { useRef, useState } from "react";
import Table from "../components/Table";

export default function Home({ posts }) {
  const [filterId, setFilterId] = useState("");
  const [filteredPosts, setFilteredPosts] = useState({});
  const ref = useRef("");

  const submitForm = async (e) => {
    e.preventDefault();
    if (!filterId) return;
    try {
      const response = await fetch(`/api/posts/${filterId}`);
      const data = await response.json();
      setFilteredPosts([data]);
      setFilterId("");
      ref.current?.reset();
    } catch (error) {
      alert(`ID ${filterId} not found`);
      ref.current?.reset();
    }
  };

  const viewAllPosts = async (e) => {
    e.preventDefault();
    setFilteredPosts(posts);
  };

  const allPosts = filteredPosts.length > 0 ? filteredPosts : posts;

  return (
    <main>
      <section className="container p-4 mx-auto ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h1 className="text-lg font-medium text-gray-800 dark:text-white">
                Home
              </h1>

              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                {allPosts.length} Posts
              </span>
            </div>

            <div
              className="mt-1 text-md text-blue-500 dark:text-gray-300 cursor-pointer"
              onClick={viewAllPosts}
            >
              View All Available Posts.
            </div>
          </div>
        </div>
        {/* Search Input */}
        <form ref={ref} onSubmit={submitForm}>
          <div className="mt-6 md:flex md:items-center md:justify-end">
            <div className="relative flex items-center mt-4 md:mt-0">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Search by id..."
                className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setFilterId(e.target.value)}
              />
              <button type="submit" className="hidden">
                Submit
              </button>
            </div>
          </div>
        </form>
        {/* Table */}
        <Table allPosts={allPosts} />

        {/* Pagination Future use */}
        <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page{" "}
            <span className="font-medium text-gray-700 dark:text-gray-100">
              1 of 10
            </span>
          </div>

          <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
            <div className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>previous</span>
            </div>

            <div className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
              <span>Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// export async function getStaticProps() {
export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 3600, // Optional: Revalidate every 1 hours
  };
};
