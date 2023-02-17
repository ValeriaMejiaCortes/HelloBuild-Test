import React, { useEffect, useState, useCallback } from "react";
import Cart from "./Cart";
import NavBar from "./NavBar";

const Home = () => {
  const [repositoryList, setRepositoryList] = useState([]);
  const [pageInfo, setPageInfo] = useState();

  /**
   * [Function to obtein repositories from github graphql public api]
   * @param  {[Object]} data [Contain the access token key needed to access the graphql api]
   * @param  {[String]} direction [Allow us to know the direction of pagination ]
   */

  const obtainData = (data, direction) => {
    fetch(`https://api.github.com/graphql`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + data.access_token,
      },
      body: JSON.stringify({
        query: `
              query {
                viewer{
                  repositories(${
                    direction === "next"
                      ? `after:"${pageInfo?.endCursor}", first: 3`
                      : direction === "prev"
                      ? `before:"${pageInfo?.startCursor}", last: 3`
                      : "first: 3"
                  }){
                    nodes {
                      databaseId
                      name
                      description
                      createdAt
                      openGraphImageUrl
                      owner{
                        avatarUrl
                        url
                      }
                      url
                    },
                    pageInfo {
                      startCursor
                      hasNextPage
                      hasPreviousPage 
                      endCursor
                    }
                  }
                }
              }
            `,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRepositoryList(data.data.viewer.repositories.nodes);
        setPageInfo(data.data.viewer.repositories.pageInfo);
      });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const paramsURL = new URLSearchParams(queryString);
    const codeParam = paramsURL.get("code");

    const params = `?client_id=${process.env.React_App_client_id}&client_secret=${process.env.React_App_client_secret}&code=${codeParam}`;

    if (!JSON.parse(localStorage.getItem("githubAccessToken"))?.access_token) {
      fetch(`/access_token` + params, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("githubAccessToken", JSON.stringify(data));
          }
          obtainData(data);
        });
    } else {
      obtainData(JSON.parse(localStorage.getItem("githubAccessToken")));
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 md:gap-6 justify-items-center text-left px-44 py-10">
        {repositoryList.map((item) => (
          <Cart repository={item} key={item.databaseId} pageInfo={pageInfo} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 sm:gap-4 md:gap-6 justify-items-center text-left px-44 py-10">
        <div className="col-span-2"></div>
        {pageInfo?.hasPreviousPage && (
          <button
            type="submit"
            className="flex justify-start  w-full text-white bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 ... hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={() =>
              obtainData(
                JSON.parse(localStorage.getItem("githubAccessToken")),
                "prev"
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-2 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Prev
          </button>
        )}
        {pageInfo?.hasNextPage && (
          <button
            type="submit"
            className="flex justify-end items-end w-full text-white bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 ... hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={() =>
              obtainData(
                JSON.parse(localStorage.getItem("githubAccessToken")),
                "next"
              )
            }
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className=" ml-2 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
