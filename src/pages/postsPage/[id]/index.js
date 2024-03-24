"use client ";
import { useEffect, useState } from "react";
import getPost from "../../../lib/getPost";
import getComments from "../../../lib/getComments";
import Image from "next/image";
import Comments from "../../../components/Comments";

export default function PostPage({ postData, commentsData }) {
  const [profile, setProfile] = useState({});

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

  return (
    <div className="mt-20">
      <div className="max-w-2xl overflow-hidden mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Image
          className="object-cover w-full h-64"
          src="https://images.unsplash.com/photo-1544894079-4184d7a29169?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Article"
          width={500}
          height={333}
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
            <div className="flex items-center">
              <div className="flex items-center">
                <Image
                  className="object-cover h-10 w-10 rounded-full"
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fqodebrisbane.com%2Fwp-content%2Fuploads%2F2019%2F07%2FThis-is-not-a-person-2-1.jpeg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images"
                  alt="Avatar"
                  height={64}
                  width={64}
                />
                <a
                  href="/"
                  className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                  tabIndex="0"
                  role="link"
                >
                  {profile.name}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mx-auto ">
        <Comments commentsData={commentsData} />
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
