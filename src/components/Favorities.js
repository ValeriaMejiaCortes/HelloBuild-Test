import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Favorities = () => {
  const favoritiesList = JSON.parse(localStorage.getItem("favoritiesList"));
  const navigate = useNavigate();

  const homeReturn = () => {
    alert("Aún no tienes favoritos");
    navigate(`/home`, { replace: true });
  };

  return (
    <>
      <NavBar />
      {favoritiesList ? (
        <div className="flex justify-center align-center mt-12 mb-24">
          <div className="table overflow-x-auto shadow-md sm:rounded-lg">
            <table className="justify-center content-center align-center text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-emerald-200 dark:bg-emerald-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3"></th>
                  <th scope="col" className="py-3">
                    Name
                  </th>
                  <th scope="col" className="py-3">
                    Repo URL
                  </th>
                  <th scope="col" className="py-3">
                    Owner URL
                  </th>
                </tr>
              </thead>
              <tbody>
                {favoritiesList.map((item) => (
                  <tr key={item.databaseId}>
                    <th
                      scope="row"
                      className="flex items-center px-12 py-4 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-14 h-14 rounded-full"
                        src={item.owner.avatarUrl}
                        alt=""
                      />
                    </th>
                    <td className="pr-12 py-4">{item.name}</td>
                    <td className=" pr-12 py-4">
                      <button
                        type="submit"
                        className="w-full text-white bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 ... ... hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <a
                          href={item.url}
                          className="font-medium text-white-600 dark:text-white-500"
                        >
                          Repo
                        </a>
                      </button>
                    </td>
                    <td className="pr-12 py-4">
                      <button
                        type="submit"
                        className="w-full text-white bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 ... ... hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <a
                          href={item.owner.url}
                          className="font-medium text-white-600 dark:text-white-500"
                        >
                          Owner profile
                        </a>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        homeReturn()
      )}
    </>
  );
};

export default Favorities;
