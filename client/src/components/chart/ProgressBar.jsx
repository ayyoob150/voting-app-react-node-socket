import React from "react";

const ProgressBar = ({ votes, total, name }) => {
  let percentage = (votes / total) * 100;
  return (
    <div className="flex justify-center items-center mt-5">
      <span className="text-sm font-bold text-secondary-dark w-1/3 text-right">
        {name}
      </span>
      <div title={name} className="h-4 w-3/4 mx-6 my-3 bg-slate-200 rounded-full border border-border">
        <div
          style={{ width: `${percentage}%` }}
          className="h-4 bg-purple-400 rounded-full shadow-lg "
        ></div>
      </div>
      <span className="w-1/3 text-sm  font-extrabold text-secondary-dark">
        {parseInt(percentage)}%
      </span>
    </div>
  );
};

export default ProgressBar;
