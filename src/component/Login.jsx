import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import service from "../appWrite/configAp";
import { login as authlogin } from "../store/authslice";
import { Button, input, Logo, logo } from "./index";
import authService from "../appWrite/auth";
import { useFrom } from "react-hook-form";
import { useDispatch } from "react-redux";

function Login() {
  const navigator = useNavigate();
  const dispathch = useDispatch();
  const { register, handelSubmit } = useFrom();
  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const login = async (data) => {
    seterror("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispathch(authlogin(userData));
          navigator("/");
        }
      }
    } catch (error) {
      seterror(error.message);
    }
  };
  return (
    <div className="flex items-center justify-cneter w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}
      >
        <div className="mb-2 flex justify-center ">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100 %" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight ">
          {" "}
          sign in your account{" "}
        </h2>
        <p className="mt-2 text-center text-base text-black/60 ">
          {" "}
          don&apos;t have any account? &nbop;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline capitalize "
          >
            sign-up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handelSubmit(login)} className="mt-8">
          <div className=" space-y-5">
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            <input
              type="password"
              lable="password"
              placeholder=" Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button> sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
