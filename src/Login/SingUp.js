import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SingUp = () => {
  const navigate = useNavigate();

  const [prevData, setPrevData] = useState({
    name: "",
    email: "",
    password: "",
  });

  /**
   * [Function to format data from login input]
   * @param  {[event]} e [Gets the event with the input data]
   * @return {[Object]} [The object with the needed format]
   */
  const getData = (e) => {
    const { value, name } = e.target;

    setPrevData(() => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  /**
   * [Function to get current credentials and store a new user in localStorage with those credentials]
   * @param  {[event]} e [Gets the event with the input data]
   */
  const submit = (e) => {
    e.preventDefault();

    const { name, email, password } = prevData;

    if (name === "") {
      alert("name required");
    } else if (!email.includes("@") && email === "") {
      alert("invalid email");
    } else if (password === "" && password.length < 8) {
      alert("Error! Remember password must be at least 8 characters");
    } else {
      alert("Account created succesfully!");
      let item = [prevData];

      const users = JSON.parse(localStorage.getItem("users"));

      if (users === null) {
        localStorage.setItem("users", JSON.stringify(item));
      } else {
        users.push(prevData);
        localStorage.setItem("users", JSON.stringify(users));
      }

      navigate(`/login`, { replace: true });
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    id="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Facundo"
                    required=""
                    onChange={getData}
                  />
                </div>
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
                  className="w-full text-white bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 ... hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={submit}
                >
                  Create account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <NavLink className="font-bold" to={"/login"}>
                    Login here
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingUp;
