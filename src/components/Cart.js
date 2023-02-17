import React, { useState } from "react";

const Cart = ({ repository }) => {
  const url = repository.url;
  const [attribute, setAttribute] = useState(false);

  /**
   * [This function save a list of your favorite repositories in localStorage]
   */
  const handleFavorite = () => {
    attribute ? setAttribute(false) : setAttribute(true);

    if (repository.isFavorite === undefined) {
      repository["isFavorite"] = true;
    } else {
      repository.isFavorite = !repository.isFavorite;
    }

    const favorites = JSON.parse(
      localStorage.getItem("favoritiesList") || "[]"
    );
    if (repository.isFavorite) {
      favorites.push(repository);
      localStorage.setItem("favoritiesList", JSON.stringify(favorites));
    } else {
      localStorage.setItem(
        "favoritiesList",
        JSON.stringify(
          favorites.filter((repo) => {
            return repo.databaseId !== repository.databaseId;
          })
        )
      );
    }
  };

  return (
    <>
      <div
        className="pb-5 shadow-2xl border border-navbarDark
      rounded min-w-full hover:scale-105 cursor-pointer"
      >
        <div className="rounded overflow-hidden shadow-lg max-w-sm w-full min-w-full">
          <img
            src={repository.openGraphImageUrl}
            alt={repository.name}
            className="w-full h-[160px] object-cointain"
          ></img>
        </div>
        <div className="py-4 px-6">
          <div className="font-bold text-md">{repository.name}</div>
          <div className="font-medium text-sm">
            {new Date(repository.createdAt).toDateString()}
          </div>

          <div className="grid gap-4 mt-6">
            <button
              type="submit"
              className="w-auto text-white bg-gradient-to-r from-teal-900 via-emerald-900 to-green-900 ... hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-small rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <a
                href={url}
                className="font-small dark:text-blue-500 hover:underline"
              >
                More
              </a>
            </button>
            {attribute ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="fill-yellow-400 col-span-1 col-end-6 w-8 h-8"
                onClick={handleFavorite}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="fill-white-400 col-span-1 col-end-6 w-8 h-8"
                onClick={handleFavorite}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
