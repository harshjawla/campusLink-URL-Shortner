import { useEffect, useState } from "react";
import { Backend_URL } from "./config";
import Loading from "./Loading";
import { Bounce, toast } from "react-toastify";
import Navbar from "./Navbar";

export default function CreateForm({username}) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [showLink, setShowLink] = useState("");
  const [copy, setCopy] = useState("Copy");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState();
  const [status, setStatus] = useState();

  function handleCopy() {
    navigator.clipboard.writeText(showLink);
    setCopy("Copied!");

    setTimeout(() => {
      setCopy("Copy");
    }, 1000);
  }

  async function handleClick(e) {
    e.preventDefault();
    if(!title || !link){
      setStatus("error");
      setMessage("All the fields are required!");
      return;
    }

    try {
      setLoader(true);
      const data = {
        title: title,
        original_link: link,
        username: username,
      };
      const response = await fetch(Backend_URL + "/createfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const receivedData = await response.json();
        setShowLink(receivedData.short_url);
      } else if(response.status===400) {
        setStatus("error");
        setMessage("Link with provided title already exists, please change the title");
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      setStatus("error");
      setMessage("Internal Server Error");
    }
  }

  useEffect(() => {
    if (showLink) {
      setLoader(false);
      setStatus("success");
      setMessage("Success!");
    }
  }, [showLink]);

  useEffect(() => {
    if (message && status) {
      if (status === "error") {
        setMessage("");
        setStatus("");
        toast.error(message, {
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
      } else if(status === "info"){
        setMessage("");
        setStatus("");
        toast.info(message, {
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
      } else if(status==="success"){
        setMessage("");
        setStatus("");
        toast.success(message, {
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
  }, [message, status]);

  return (
    <div className="px-10 py-10 h-screen bg-slate-100">
    {loader && <Loading />}
      <Navbar />
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-slate-100">
          <form>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Title <span className="text-red-500"> * </span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Title of the link"
                className="w-full rounded-md mb-5 border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Link <span className="text-red-500"> * </span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter full link"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e) => setLink(e.target.value)}
                value={link}
              />
            </div>
            {showLink && (
              <div className="mb-5">
                <label
                  htmlFor="link"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Your Shorten Link
                </label>
                <div className="flex items-center">
                  <input
                    type="link"
                    name="link"
                    id="link"
                    placeholder="Enter Full link"
                    className="flex-grow rounded-md border border-[#e0e0e0] bg-gray-200 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    defaultValue={showLink}
                    disabled
                  />
                  <button
                    type="button"
                    className="ml-3 px-4 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                    onClick={handleCopy}
                  >
                    {copy}
                  </button>
                </div>
              </div>
            )}
            <div>
              <button
                onClick={handleClick}
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Short Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
