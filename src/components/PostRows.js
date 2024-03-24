"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function PostRows(props) {
  const { post } = props;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/profiles/${post.authorId}`
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
  }, [post]);

  // const addDefaultSrc = (ev) => {
  //   setImage(
  //     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fqodebrisbane.com%2Fwp-content%2Fuploads%2F2019%2F07%2FThis-is-not-a-person-2-1.jpeg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images"
  //   );
  // };

  return (
    <>
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-white ">
            {post.title}
          </h2>
        </div>
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div>
          <h4 className="text-gray-700 dark:text-gray-200">{profile.name}</h4>
        </div>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          {/* Permission required to add "external-content.duckduckgo.com" Image from "next/image" to `next.config.js` */}
          {/* Bad profile.imageUrl src Look for a way to check src before display perhaps custom hook? */}
          <Image
            className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fqodebrisbane.com%2Fwp-content%2Fuploads%2F2019%2F07%2FThis-is-not-a-person-2-1.jpeg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images"
            alt="Author Image"
            width={64}
            height={64}
          />
        </div>
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <Link href={`/postsPage/${post.id}`}>
          <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>
        </Link>
      </td>
    </>
  );
}

export default PostRows;
