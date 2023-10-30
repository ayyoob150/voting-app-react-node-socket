import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

const context = createContext();

const ContextProvider = ({ children }) => {
  const [page, setPage] = useState(false);
  const [vote, setVote] = useState();
  const [loading, setLoading] = useState(false);
  const [updateVote, setUpdateVote] = useState();
  const [user, setUser] = useState();
  const location = useLocation();

  function useSyncedState(key, initialValue) {
    const [state, setState] = useState(() => {
      const savedState = sessionStorage.getItem(key);
      return savedState !== null ? savedState : initialValue;
    });

    useEffect(() => {
      sessionStorage.setItem(key, state);
    }, [key, state]);

    return [state, setState];
  }
  const [userId, setUserId] = useSyncedState("user", "");
  useEffect(()=>{
    fetch("http://localhost:1000/vote")
      .then((res) => res.json())
      .then((result) => {
        setVote(result);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  },[])
  
  useEffect(() => {
    setLoading(true);
    if (userId !== "" && userId !== null) {
      fetch(`http://localhost:1000/user/login/${userId}`)
        .then((res) => res.json())
        .then((datas) => {
          setUser(datas);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [updateVote, userId]);

  return (
    <context.Provider
      value={{
        location,
        userId,
        setUserId,
        loading,
        setLoading,
        page,
        setPage,
        vote,
        updateVote,
        setUpdateVote,
        user,
        setUser,
        setVote
      }}
    >
      {children}
    </context.Provider>
  );
};

export { context, ContextProvider };
