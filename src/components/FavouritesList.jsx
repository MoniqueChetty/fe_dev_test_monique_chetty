"use client";
import { useFavourites } from "../hooks/useFavourites";

const FavouritesList = () => {
  const { favourites } = useFavourites();

  return (
    <footer className="flex flex-col mt-6 w-full mx-auto ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex items-center gap-x-3 focus:outline-none">
                      <span>Favourites</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {favourites.map((favourite) => (
                  <tr key={favourite.id}>
                    <td className="px-4 py-4 text-sm font-medium">
                      <div>
                        <div className="text-sm font-normal text-gray-600 dark:text-gray-400">
                          {favourite.title}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FavouritesList;
