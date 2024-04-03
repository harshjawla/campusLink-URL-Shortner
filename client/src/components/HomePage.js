import { Link } from "react-router-dom";
import companyLogo from "../logos/companylogo.svg";
import { Frontend_URL } from "./config";

export default function HomePage() {

  function handleClick(){
    window.location.href = Frontend_URL + "/register";
  }

  return (
    <div className="min-h-screen min-w-full bg-gray-100 flex flex-col justify-center py-10 px-10 ">
      <div className="relative w-full max-w-full lg:max-w-6xl xl:max-w-screen-2xl mx-auto">
        <div className="absolute inset-0 -mr-3.5 bg-gradient-to-r from-red-100 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-3 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl">
          <div className="flex items-center justify-start pt-6 pl-6">
            <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
            <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
          </div>

          <div className="px-20 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center text-3xl font-bold text-true-gray-800">
                  <img src={companyLogo} alt="companylogo" className="w-10 h-10 mr-3"></img>
                  CampusLink
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <Link
                  to={"/login"}
                  className="mr-5 text-lg font-medium text-true-gray-800 hover:text-cool-gray-700 transition duration-150 ease-in-out"
                >
                  Login
                </Link>
                <Link to={"/register"} className="px-6 py-3 rounded-3xl font-medium bg-gradient-to-b from-gray-900 to-black text-white outline-none focus:outline-none hover:shadow-md hover:from-true-gray-900 transition duration-200 ease-in-out">
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="lg:2/6 xl:w-2/4 mt-20 lg:mt-20 lg:ml-16 text-left mb-10">
              <div className="text-6xl font-semibold text-gray-900 leading-none mb-10">
                CampusLink
              </div>
              <div className="mt-6 text-xl font-light text-true-gray-500 antialiased">
                CampusLink is the ultimate URL shortener service designed
                exclusively for college students. Say goodbye to lengthy URLs
                cluttering your notes and documents! With CampusLink, you can
                quickly and easily shorten any URL to share resources, project
                links, study materials, and more with classmates and professors.
              </div>
              {/* <HomePagePhoto className="flex" /> */}
              <button onClick={handleClick} className="mt-6 px-8 py-4 rounded-full font-normal tracking-wide bg-gradient-to-b from-blue-600 to-blue-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-blue-700 transition duration-200 ease-in-out">
                Get Started for Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
