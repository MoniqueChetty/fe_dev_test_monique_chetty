import CommentRows from "./CommentRows";

export default function Comments({ commentsData }) {
  return (
    <div className="max-w-2xl overflow-hidden  bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 ">
      {commentsData.map((comment, index) => (
        // uniquekey needs to be generated for functionality
        <div key={index} className="flex items-center ">
          <section class="container px-4 mx-auto">
            <div class="flex flex-col ">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
