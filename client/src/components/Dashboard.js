import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import deletelogo from "../logos/delete.svg";
import copylogo from "../logos/copy.svg";
import editlogo from "../logos/edit.svg";
import linklogo from "../images/link.png";
import Loading from "./Loading";
import { Backend_URL, Frontend_URL } from "./config";
import { Bounce, toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import NoLinksMessage from "./NoLinksMessage";

const Dashboard = ({ user }) => {
  const [loader, setLoader] = useState(true);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState();
  const [status, setStatus] = useState();
  const [toggleModal, setToggleModal] = useState(false);

  function handleCopy(copyLink){
    navigator.clipboard.writeText(copyLink);
    setMessage("Copied");
    setStatus("success");
  }

  function handleDelete(file){
    setToggleModal(file);
  }

  function closeModal(){
    setToggleModal("");
  }

  useEffect(() => {
    async function fileParser() {
      const response = await fetch(Backend_URL + "/userfiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user.username }),
      });

      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    }

    fileParser();
  }, [user.username]);

  useEffect(() => {
    if (files) {
      setLoader(false);
    }
  }, [files]);

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
    <div className="bg-slate-100 min-h-screen">
      {loader && <Loading />}
      {toggleModal && <DeleteModal file={toggleModal} onClose={closeModal} />}
      <div className="px-10 py-10">
        <Navbar />
        {files.length===0 && <NoLinksMessage />}
        {files.length>0 && <div className="mx-4 my-2">
          <h1 className="text-2xl font-bold mb-4 mt-8">Your Links</h1>
          <hr className="my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files &&
              files.map((file, index) => {
                return (
                  <div className="bg-white rounded-lg shadow-md p-4 mb-4 mr-4" key={index}>
                    <div className="flex-none flex items-center justify-center mb-4 mr-4">
                      <img
                        src={linklogo}
                        alt="Avatar"
                        className="rounded-full w-20 h-20"
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-lg font-bold mb-2 truncate">{file.title}</h2>
                      <a
                        href={file.short_url}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-blue-500 hover:underline mb-1 truncate"
                      >
                        {file.short_url}
                      </a>
                      <a
                        href={file.short_url}
                        rel="noreferrer"
                        target="_blank"
                        className="block border-b border-dotted text-gray-600 border-gray-700 hover:underline mb-1 pb-2 truncate"
                      >
                        {file.original_link}
                      </a>
                      <p className="mb-4 mt-4">
                        No. of Clicks:{" "}
                        <span className="text-blue-500"> {file.clicks} </span>
                      </p>
                      <button className="bg-white hover:bg-gray-200 px-1 py-1 font-bold rounded mr-2 mb-2">
                        <img
                          src={copylogo}
                          alt="deletelogo"
                          className="w-8 h-8 "
                          onClick={()=> handleCopy(file.short_url)}
                        />
                      </button>
                      <button className="bg-white hover:bg-gray-200 px-1 py-1 font-bold rounded mr-2 mb-2">
                        <img
                          src={editlogo}
                          alt="deletelogo"
                          className="w-8 h-8 "
                          onClick={()=> window.location.href = Frontend_URL + "/edit/" + file.linkID}
                        />
                      </button>
                      <button className="bg-white hover:bg-gray-200 px-1 py-1 font-bold rounded mr-2 mb-2">
                        <img
                          src={deletelogo}
                          alt="deletelogo"
                          className="w-8 h-8"
                          onClick={()=> handleDelete(file)}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Dashboard;
