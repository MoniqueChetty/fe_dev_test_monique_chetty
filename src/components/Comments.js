import CommentRows from "./CommentRows";

export default function Comments({ commentsData }) {
  return (
    <div className="mx-auto w-1/2">
      <div className="max-w-2xl  overflow-hidden mx-auto  rounded-lg shadow-md bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 ">
        {commentsData.map((comment, index) => (
          // uniquekey needs to be generated for functionality
          <div key={index} className="flex items-center  ">
            <CommentRows comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
}
