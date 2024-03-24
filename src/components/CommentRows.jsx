import { useEffect, useState } from "react";
import Image from "next/image";

export default function CommentRows({ comment }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/profiles/${comment.profileId}`
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
  }, [comment.profileId]);

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        <tr>
          <td className="px-4 py-4 text-sm font-medium">
            <div>
              <div className="text-sm font-normal text-gray-600 dark:text-gray-400">
                {comment.text}
              </div>
            </div>
          </td>

          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <div className="flex justify-end">
              <h4 className="text-gray-700 dark:text-gray-200">
                {profile.name}
              </h4>
            </div>
          </td>
          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <div className="flex justify-end mr-10">
              <Image
                className="object-cover w-7 h-7 border-2 border-white rounded-full dark:border-gray-700 "
                src="https:external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fqodebrisbane.com%2Fwp-content%2Fuploads%2F2019%2F07%2FThis-is-not-a-person-2-1.jpeg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images"
                alt="Author Image"
                width={64}
                height={64}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}
