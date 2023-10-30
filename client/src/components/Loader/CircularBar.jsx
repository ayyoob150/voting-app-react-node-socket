import React from "react";

const CircularBar = () => {
  return (
    <div className="absolute flex justify-center items-center h-full w-full">
      <div className="fixed flex justify-center items-center bg-white h-20 w-20 rounded-md drop-shadow-lg">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-11 w-11 border-t-4 border-secondary-dark border-solid"></div>
        </div>
      </div>
    </div>
  );
};

export default CircularBar;
