import React, { useContext, useState } from "react";
import { context } from "../context/context";
import UserAccount from "./Auth/UserAccount";
import CircularBar from "./Loader/CircularBar";
import { useNavigate } from "react-router";

const Feed = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const { userId, vote, loading, setLoading, setUpdateVote, user } =
    useContext(context);
  if (userId === "" || userId === null) {
    navigate("/", { replace: true });
    return;
  }
  const handleOption = (e) => {
    setSelectedOption(e.target.value);
  };

  const handle = () => {
    if (!user) {
      alert("Please login first to vote");
      return;
    }
    setLoading(true);

    if (user.vote === "") {
      fetch("http://localhost:1000/user", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          vote: selectedOption,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setUpdateVote(result);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
      fetch("http://localhost:1000/vote", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nominee: selectedOption,
          userId: user?._id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setUpdateVote(result);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });

      setLoading(false);
    } else {
      alert("you have alreay given vote");
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="title">Cast Your Vote for the Preferred Nominee</div>
      <div className="subtitle">
        Make Your Voice Heard in the Election Process
      </div>
      <div className="flex flex-wrap justify-center xs:p-2 sm:p-6 xs:gap-8 sm:gap-8 flex-1">
        <div className="flex sm:flex-row xs:flex-col w-full gap-4">
          {loading && <CircularBar />}
          <div className="rounded-md shadow-md border border-secondary-fade p-6 sm:w-half xs:w-full bg-black-transparent">
            <div className="mb-4 text-sm text-secondary-dark font-bold">
              Select Any Nominee You Wish to Vote
            </div>
            <div className="grid grid-cols-2 gap-6">
              {vote?.map((el, i) => (
                <label key={i} className="inline-flex items-center">
                  <input
                    type="radio"
                    value={el.nominee}
                    disabled={user?.vote !== ""}
                    checked={
                      selectedOption === el.nominee || el.nominee === user?.vote
                    }
                    onChange={(e) => handleOption(e)}
                    className="h-4 w-4 text-secondary"
                  />
                  <span className="ml-2">{el.nominee}</span>
                </label>
              ))}
            </div>
            <p className="mt-6">
              Selected Vote for Nominee : {selectedOption || user?.vote}
            </p>
            <button
              onClick={handle}
              disabled={selectedOption === "" || user?.vote !== ""}
              className="btn-primary mt-8 text-cennter"
            >
              Vote
            </button>
          </div>
          {userId && (
            <div className="rounded-md shadow-md border border-secondary-fade p-6 sm:w-half xs:w-full bg-black-transparent ">
              <UserAccount user={user} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
