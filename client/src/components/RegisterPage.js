import { useEffect, useState } from "react";
import companyLogo from "../logos/companylogo.svg";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { Bounce, toast } from "react-toastify";
import { Backend_URL, Frontend_URL } from "./config";

export default function RegisterPage() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [status, setStatus] = useState("");
  const [registered, setRegistered] = useState(false);

  async function handleClick() {
    if (!email || !password || !confirmPassword) {
      setStatus("error");
      return setWarning("All the fields are required");
    }
    if (password !== confirmPassword) {
      setStatus("error");
      return setWarning("Passwords don't match!");
    }

    setLoader(true);

    try {
      const data = {
        username: email,
        password: password,
      };
      setPassword("");
      setConfirmPassword("");
      const response = await fetch(Backend_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setRegistered(true);
      } else if (response.status === 400) {
        setLoader(false);
        setWarning("User already exist, please login");
        setStatus("info");
      } else {
        setLoader(false);
        setWarning("Internal Server Error");
        setStatus("error");
      }
    } catch (error) {
      setLoader(false);
      setWarning("Internal Server Error");
      setStatus("error");
    }
  }

  useEffect(() => {
    if (warning && status) {
      if (status === "error") {
        setWarning("");
        setStatus("");
        toast.error(warning, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else if (status === "info") {
        setWarning("");
        setStatus("");
        toast.info(warning, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else if (status === "success") {
        setWarning("");
        setStatus("");
        toast.success(warning, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  }, [warning, status]);

  useEffect(() => {
    if (registered) {
      window.location.href = Frontend_URL + "/dashboard";
    }
  }, [registered]);

  return (
    <>
      {loader && <Loading />}
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex items-center justify-center cursor-pointer" onClick={()=> window.location.href = Frontend_URL + "/"}>
              <img
                src={companyLogo}
                className="w-10 h-10 mr-2"
                alt="register page"
              />
              <span className="text-xl font-bold">CampusLink</span>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-whitw"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                  <button
                    onClick={handleClick}
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account{" "}
                    <Link
                      to="/login"
                      className="border-b border-blue-500 text-blue-500 border-dotted"
                    >
                      click to LogIn
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
