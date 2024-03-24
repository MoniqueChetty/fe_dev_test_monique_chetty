import CommentRows from "./CommentRows";

export default function Comments({ commentsData }) {
  return (
    <div className="max-w-5xl overflow-hidden  bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 ">
      {commentsData.map((comment, index) => (
        // uniquekey needs to be generated for functionality
        <div key={index} className="flex items-center ">
          <section className="container px-4 mx-auto">
            <div className="flex flex-col ">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <CommentRows comment={comment} />
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
