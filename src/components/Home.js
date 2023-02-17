import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import NavBar from "./NavBar";

const Home = () => {
  const [repositoryList, setRepositoryList] = useState([]);
  const [pageInfo, setPageInfo] = useState();

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

  const obtainData = (data, direction) => {
    console.log(direction);
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
        console.log(data);
        setRepositoryList(data.data.viewer.repositories.nodes);
        setPageInfo(data.data.viewer.repositories.pageInfo);
      });
  };

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 md:gap-6 justify-items-center text-left px-32 py-10">
        {repositoryList.map((item) => (
          <Cart repository={item} key={item.databaseId} pageInfo={pageInfo} />
        ))}
        {pageInfo?.hasPreviousPage && (
          <button
            onClick={() =>
              obtainData(
                JSON.parse(localStorage.getItem("githubAccessToken")),
                "prev"
              )
            }
          >
            Prev
          </button>
        )}
        {pageInfo?.hasNextPage && (
          <button
            onClick={() =>
              obtainData(
                JSON.parse(localStorage.getItem("githubAccessToken")),
                "next"
              )
            }
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
