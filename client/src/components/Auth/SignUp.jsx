import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { card } from "../utililties";
import CircularBar from "../Loader/CircularBar";
import { context } from "../../context/context";

const SignUp = () => {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const { setUserId } = useContext(context);

  const [data, setData] = useState({
    email: "",
    password: "",
    role:"user"
  });
  const handler = (e) => {
    e.preventDefault()
    let value = e.target.value;
    let name = e.target.name;
    setData({
      ...data,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (data.email == "" || data.password == "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [data]);

  const btnhandler = (e) => {
    e.preventDefault()
    setLoading(true);
    fetch("http://localhost:1000/user/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>res.json())
      .then((data) => {
        setStatus(data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    if (status.status === "ok") {
      setUserId(data.email);
      // sessionStorage.setItem("user", data.email);
      navigate("/home",{replace:true});
    } else if (status.status === "Error") {
      alert(` ${status.status}  ${status.error}`);
      setUserId(data.email);
      setStatus({});
    }
  }, [status, data.email, navigate]);

  return (
    <div className="grid place-items-center gap-4 m-6">
      {loading && <CircularBar />}
      <div className={`mt-4  text-secondary-dark  font-semibold text-center `}>
        Create Your Account
      </div>
      <form>
        <div className="mt-8">
          <div className="loginFiledTilte">Email</div>
          <input
            type="email"
            value={data.email}
            name="email"
            onChange={(e) => handler(e)}
            required
            placeholder="abc@email.com"
            className="input-primary"
            autoComplete="user-email"
          />
        </div>
        <div className="mt-4">
          <div className="loginFiledTilte">Password</div>
          <input
            type="password"
            value={data.pass}
            name="password"
            onChange={(e) => handler(e)}
            required
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
          Singup
        </button>
      </form>
      <Link
        to="/"
        className={` ${card.typography} font-semibold underline`}
      >
        Login
      </Link>
    </div>
  );
};

export default SignUp;
