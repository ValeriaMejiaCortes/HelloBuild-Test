import React from "react";
import NavBar from "./NavBar";

const Favorities = () => {
  const favoritiesList = JSON.parse(localStorage.getItem("favoritiesList"));
  console.log(favoritiesList);

  return (
    <>
      <NavBar />
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          {favoritiesList.map((item) => (
            <li className="pb-3 sm:pb-4 m-auto" key={item.databaseId}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.owner.avatarUrl}
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-1 w-full">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-black-500 truncate dark:text-gray-400">
                    <a
                      href={item.url}
                      className="font-small dark:text-blue-500 hover:underline"
                    >
                      {item.url}
                    </a>
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <a
                    href={item.owner.url}
                    className="font-small dark:text-blue-500 hover:underline"
                  >
                    Owner repository
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Favorities;
