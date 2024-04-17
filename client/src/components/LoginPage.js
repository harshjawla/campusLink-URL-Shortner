import { Link } from "react-router-dom";
import Loading from "./Loading";
import { Bounce, toast } from "react-toastify";
import { Backend_URL, Frontend_URL } from "./config";
import { useEffect, useState, useNavigate } from "react";
import companyLogo from "../logos/companylogo.svg";

export default function LoginPage() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [status, setStatus] = useState("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  async function handleClick() {
    if (!email || !password) {
      setWarning("All the fields are required!");
      setStatus("error");
      return;
    }

    setLoader(true);

    try {
      const data = {
        username: email,
        password: password,
      };
      setPassword("");
      const response = await fetch(Backend_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setLogin(true);
      } else if (response.status === 401) {
        setLoader(false);
        setWarning("Combination of Email and Password does not match");
        setStatus("error");
      } else if (response.status === 400) {
        setLoader(false);
        setWarning("User not registered");
        setStatus("error");
      } else {
        setLoader(false);
        setWarning("Internal Server Error");
        setStatus("error");
      }
    } catch (error) {
      console.log(error);
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
    if (login) {
      // window.location.href = Frontend_URL + "/dashboard";
      navigate("/dashboard");
    }
  }, [login]);

  return (
    <>
      {loader && <Loading />}
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="flex items-center justify-center cursor-pointer" onClick={()=> window.location.href = Frontend_URL + "/"}>
            <img
              src={companyLogo}
              className="w-10 h-10 mr-2"
              alt="register page"
            />
            <span className="text-xl font-bold">CampusLink</span>
          </div>
          <div className="mt-5 bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail <span className="text-red-600"> * </span>
              </label>
              <input
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Password <span className="text-red-600"> * </span>
              </label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="button"
                onClick={handleClick}
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button onClick={()=> window.location.href = Frontend_URL + "/forgotpassword"} className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="inline-block ml-1">Forgot Password</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <Link to={"/register"} className="inline-block ml-1">
                    New to CampusLink, register yourself here.
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
