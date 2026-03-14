import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../appWrite/auth";
import Logo from "./Logo";
import Input from "./Input";
import { useForm } from "react-hook-form";
import Button from "./Button";

function Signup() {
  const navigatir = useNavigate();
  const [error, seterror] = useState();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    seterror("");
    try {
      const Userdata = await authService.createAccount(data);
      if (Userdata) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authService.login(userData));
          navigatir("/");
        }
      }
    } catch (error) {
      seterror(error.message);
    }
  };
  return (
    <div className=" flex items-center justify-center ">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10 ">
        <div className="mb-2 flex justify-center  ">
          <span className=" inline-block w-full max-w-[100px]">
            <Logo width="100px" />
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
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              lable="full Name"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
            {/* email input form */}
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
            {/* password input */}
            <Input
            type='password'
            placeholder="Password"
            lable="Password"
            {...register("password",{required:true})}
            />
            {/* button for submit  */}
            <Button type="submit"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
