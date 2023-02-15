import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [prevData, setPrevData] = useState({
    email: "",
    password: "",
  });

  const getData = (e) => {
    const { value, name } = e.target;

    setPrevData(() => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const submit = (e) => {
    e.preventDefault();

    const getUserArr = localStorage.getItem("users");

    const { email, password } = prevData;
    if (!email.includes("@") && email === "") {
      alert("invalid email");
    } else if (password === "" && password.length < 8) {
      alert("Error! Remember password must be at least 8 characters");
    } else {
      if (getUserArr && getUserArr.length) {
        const userData = JSON.parse(getUserArr);
        const userLogin = userData.filter((elem, k) => {
          return elem.email === email && elem.password === password;
        });

        if (userLogin.length === 0) {
          alert("invalid credentials");
        } else {
          alert("Login succesfully");
          localStorage.setItem("userLoged", JSON.stringify([userLogin]));
          navigate(`/home`, { replace: true });
        }
      }
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sing In
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    id="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="hello@build.com"
                    required=""
                    onChange={getData}
                  />
                </div>
                <div>
                  <label
                    id="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={getData}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 ... hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={submit}
                >
                  Log In
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Do you want to create other account?{" "}
                  <NavLink to={"/"}>click here</NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
