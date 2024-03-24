"use client ";
import { useEffect, useState } from "react";
import Image from "next/image";
import getPost from "../../../lib/getPost";
import getComments from "../../../lib/getComments";
import Comments from "../../../components/Comments";
import AddComment from "../../../components/AddComment";
import { useFavourites } from "../../../hooks/useFavourites";

export default function PostPage({ postData, commentsData }) {
  const [profile, setProfile] = useState({});
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const favourite = isFavourite(postData.id);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/profiles/${postData.authorId}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const profileData = await res.json();
        setProfile(profileData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProfile();
  }, [postData.authorId]);

  const handleFavouriteClick = () => {
    favourite ? removeFavourite(postData.id) : addFavourite(postData);
  };

  return (
    <div className="mt-20">
      <div className="max-w-5xl overflow-hidden mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Image
          className="object-cover w-full h-64"
          src="https://raw.githubusercontent.com/MoniqueChetty/Netflix-clone/main/netflix-clone/public/carimage.jpg"
          alt="Article"
          width={450}
          height={300}
        />

        <div className="p-6">
          <div>
            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
              Post
            </span>
            <a
              href="#"
              className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
              tabIndex="0"
              role="link"
            >
              {postData.title}
            </a>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {postData.body}
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  className="object-cover h-10 w-10 rounded-full"
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fqodebrisbane.com%2Fwp-content%2Fuploads%2F2019%2F07%2FThis-is-not-a-person-2-1.jpeg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images"
                  alt="Avatar"
                  height={64}
                  width={64}
                />
                <div
                  className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                  tabIndex="0"
                  role="link"
                >
                  {profile.name}
                </div>
              </div>
              <div>
                <button
                  onClick={handleFavouriteClick}
                  className="flex flex-end mr-16"
                >
                  {favourite ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#fbbf24]"
                      fill="currentColor"
                      viewBox="-1.5 -1.5 26 26"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.286 7.03h7.416c.969 0 1.371 1.24.588 1.816l-5.961 4.37 2.175 6.69c.303.927-.755 1.695-1.541 1.116l-5.985-4.392-5.986 4.392c-.785.579-1.843-.189-1.54-1.116l2.175-6.69-5.961-4.37c-.783-.576-.38-1.816.588-1.816h7.416l2.286-7.029z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="currentColor"
                      viewBox="-1.5 -1.5 26 26"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.286 7.03h7.416c.969 0 1.371 1.24.588 1.816l-5.961 4.37 2.175 6.69c.303.927-.755 1.695-1.541 1.116l-5.985-4.392-5.986 4.392c-.785.579-1.843-.189-1.54-1.116l2.175-6.69-5.961-4.37c-.783-.576-.38-1.816.588-1.816h7.416l2.286-7.029z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl overflow-hidden mx-auto mt-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Comments commentsData={commentsData} />
      </div>
      <div className="max-w-5xl overflow-hidden mx-auto mt-4">
        <AddComment postId={postData.id} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const postData = await getPost(params.id);
    const commentsData = await getComments(params.id);
    return { props: { postData, commentsData } };
  } catch (error) {
    console.error(error);
    return { props: { error: error.message } };
  }
}
