import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`https://api.github.com/graphql`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("githubAccessToken")).access_token,
      },
      body: JSON.stringify({
        query: `
              query {
                viewer{
                  avatarUrl
                  bio
                  location
                  login
                  name
                  url
                }
              }
            `,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.viewer.avatarUrl);
        setUser(data.data.viewer);
      });
  }, []);

  return (
    <>
      <NavBar />
      {user && (
        <section className="pt-16 bg-blueGray-50 mb-16">
          <div className="w-full lg:w-4/12 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-slate w-full mb-6 shadow-2xl rounded-lg mt-16">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <img
                      alt="..."
                      src={user.avatarUrl}
                      className="drop-shadow-2xl rounded-full h-auto align-middle border-black -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="text-center mt-32">
                  <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {user.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {user.location}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {user.bio}
                      </p>
                      <a
                        href={user.url}
                        className="font-normal text-emerald-700 "
                      >
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
