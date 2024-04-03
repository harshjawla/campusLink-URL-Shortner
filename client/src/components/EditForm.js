import { useEffect, useState } from "react";
import { Backend_URL } from "./config";
import Loading from "./Loading";
import { Bounce, toast } from "react-toastify";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";

export default function EditForm({ username }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [showLink, setShowLink] = useState("");
  const [copy, setCopy] = useState("Copy");
  const [loader, setLoader] = useState(true);
  const [message, setMessage] = useState();
  const [status, setStatus] = useState();
  const { linkID } = useParams();
  const navigate = useNavigate();

  function handleCopy() {
    navigator.clipboard.writeText(showLink);
    setCopy("Copied!");

    setTimeout(() => {
      setCopy("Copy");
    }, 1000);
  }

  useEffect(() => {
    async function fileAuth() {
      try {
        const data = {
            username,
            linkID
        }
        const response = await fetch(Backend_URL + "/searchFile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const receivedData = await response.json();
          setShowLink(receivedData.short_url);
          setLink(receivedData.original_link);
          setTitle(receivedData.title);
        } else {
            return navigate("/error");
        }
      } catch (error) {
        console.log(error);
        return navigate("/error");
      }
    }

    fileAuth();
  }, [linkID,navigate,username]);

  async function handleClick(e) {
    e.preventDefault();
    if (!title || !link) {
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
        linkID: linkID,
      };
      const response = await fetch(Backend_URL + "/editfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Success!");
        setLoader(false);
      } else if(response.status===401) {
        setStatus("error");
        setMessage(
          "Link with provided title already exists, please change the title"
        );
        setLoader(false);
      } else{
        setStatus("error");
        setMessage(
          "Failed, the link has been deleted!"
        );
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      setStatus("error");
      setMessage("Internal Server Error");
    }
  }

  useEffect(() => {
    if (showLink && link && title) {
      setLoader(false);
    }
  }, [showLink, link, title]);

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
      } else if (status === "info") {
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
      } else if (status === "success") {
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
                Update Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
