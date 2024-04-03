import React from 'react';
import HomePagePhoto from './HomePagePhoto';
import { Frontend_URL } from './config';

const NoLinksMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <HomePagePhoto className="mb-10" />
      <p className="text-xl text-black mt-5 mb-5">No links created yet</p>
      <p onClick={()=> window.location.href = Frontend_URL + "/create"} className="text-lg mb-8 text-blue-500 cursor-pointer border-b border-dotted border-blue-600">Create a link to get started</p>
    </div>
  );
};

export default NoLinksMessage;
