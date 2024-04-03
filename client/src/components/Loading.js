import React from "react";
import loading from "../logos/loading.svg";

export default function Loading() {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 overflow-hidden">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
        <div className="h-24 w-24 bg-transparent z-50">
          <img src={loading} alt="loadingImage" />
        </div>
      </div>
    </div>
  );
}
