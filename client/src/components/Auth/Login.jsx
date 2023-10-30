import React, { useContext, useEffect, useState } from "react";
import { card } from "../utililties";
import { Link, useNavigate } from "react-router-dom";
import CircularBar from "../Loader/CircularBar";
import { context } from "../../context/context";

const Login = ({ admin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { setUserId } = useContext(context);

  useEffect(() => {
    if (data.email === "" || data.password === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [data]);

  const handler = (e) => {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    setData({
      ...data,
      [name]: value,
      role: admin === "admin" ? "admin" : "user",
    });
  };

  const btnhandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:1000/user/login/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((status) => {
        setUser(status);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.status);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.user === true) {
      setUserId(data.email);
      navigate(admin === "admin" ? "/admin" : "/home", { replace: true });
    } else if (user?.user === false) {
      alert(` ${user.status}  ${user.error}`);
      setUserId("");
      setUser({});
    }
  }, [user, data.email, setUserId, navigate]);

  return (
    <div className="grid place-items-center gap-4 m-6">
      {loading && <CircularBar />}
      <div className={`mt-4  text-secondary-dark font-semibold text-center `}>
        {admin === "admin" ? "Admin Login Page" : "Login User Accoount"}
      </div>
      <form>
        <div className="mt-8">
          <div className="loginFiledTilte">Email</div>
          <input
            required
            type="email"
            value={data.email}
            name="email"
            onChange={(e) => handler(e)}
            placeholder="abc@email.com"
            className="input-primary"
            autoComplete="user-email"
          />
        </div>
        <div className="mt-4">
          <div className="loginFiledTilte">Password</div>
          <input
            required
            type="password"
            value={data.password}
            name="password"
            onChange={(e) => handler(e)}
            placeholder="Secret Password"
            className="input-primary"
            autoComplete="current-password"
          />
        </div>
        <button
          disabled={disable}
          onClick={(e) => btnhandler(e)}
          className="btn-primary mt-10"
        >
          Login
        </button>
      </form>
      {admin !== "admin" && (
        <Link
          to="/signup"
          className={` ${card.typography} font-semibold underline`}
        >
          SignUp
        </Link>
      )}
    </div>
  );
};

export default Login;
