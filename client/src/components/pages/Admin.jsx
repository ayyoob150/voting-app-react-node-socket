import React, { useContext, useEffect } from "react";
import CircularBar from "../Loader/CircularBar";
import { context } from "../../context/context";
import PieChart from "../chart/PieChart";
import ProgressBar from "../chart/ProgressBar";
import { useNavigate } from "react-router";
import io from "socket.io-client";


const Admin = () => {
  const navigate = useNavigate()
  const { vote,userId,loading,setVote } = useContext(context);
  const nominees = vote?.map(({ nominee }) => nominee);
  const votes = vote?.map(({ allVotes }) => allVotes?.length);
  const total = votes?.reduce((total, number) => total + number);
  
  const socket = io.connect('http://localhost:3001')

  useEffect(() => {
    socket.on("Votes", async (updatedVote) => {
      const data = await updatedVote;
      setVote(data);
    });
    return () => {
      socket.disconnect()
    };
  }, []);
  if(userId === "" || userId === null){
    navigate("/" ,{replace:true})
    return
  }
  return (
    <div>
      {loading &&  <CircularBar/>}
      <div className="title">
        Vote Distribution of Nominees
      </div>
      <div className="subtitle">
        Exploring the Distribution of Votes Among Nominees
      </div>
      <div className="flex gap-4 mx-2 my-8 justify-center sm:flex-nowrap xs:flex-wrap">
        {vote?.map((el, i) => (
          <div
            key={i}
            title={el.nominee}
            className="p-7 text-center bg-secondary-fade rounded-md shadow-md border border-secondary"
          >
            <div className="text-lg font-extrabold text-primary-dark">
              {el.nominee}
            </div>
            <div className="mt-3 text-lg font-extrabold">
              {el.allVotes.length}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center font-bold text-primary-dark">
        Total Votes :{" "}
        <span className="text-gray-800 text-lg font-extrabold">{total}</span>
      </div>

      <div className="flex sm:flex-row xs:flex-col">
        <div className=" xs:w-full sm:w-half">
          <div className="text-center my-12 text-gray-500">
            Breakdown of Votes Received by Nominees
          </div>

          {votes?.map((el, i) => (
            <ProgressBar key={i} votes={el} name={nominees[i]} total={total} />
          ))}
        </div>

        <div className="xs:w-full sm:w-half ">
          <div className="text-center sm:my-1 xs:my-12 text-gray-500">
            Pie Chart of Votes Shown in Graph
          </div>
          <PieChart votes={votes} nominees={nominees} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
