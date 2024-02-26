import React, { useState } from "react";
import { Input } from "../index";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiService from "../../api/apiService";
import Swal from "sweetalert2";

const toastMixin = Swal.mixin({
  toast: true,
  icon: "success",
  title: "General Title",
  animation: false,
  position: "top-right",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    try {
      const userToken = await apiService.login(data);
      if (!userToken || userToken.error) {
        setError("Invalid username or password");
      } else {
        dispatch(authLogin(userToken));
        toastMixin.fire({
          animation: false,
          title: "Signed in Successfully",
        });
        navigate("/admin/product");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="max-w-screen-xl m-0 md:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 ">
        <div className="lg:w-1/2 md:w-2/3 p-6">
          <div className="w-full flex-1">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-bold mt-8">Login</h1>
              <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(login)}>
                  <div>
                    <Input
                      label="User Name"
                      id="username"
                      name="username"
                      type="text"
                      // placeholder="abc@xyz.com"
                      autoComplete="username"
                      {...register("username", {
                        required: "Please enter a username",
                        validate: {
                          matchPattern: (value) =>
                            /^[A-Za-z0-9_-]+$/.test(value) ||
                            "Enter a valid username",
                        },
                      })}
                      error={errors.username?.message || error}
                    />
                  </div>
                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Please enter a password",
                      validate: {
                        matchPattern: (value) =>
                          /^(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
                            value
                          ) ||
                          "Password should be 8-16 characters and must contain a lowercase,an upper case and special character",
                      },
                    })}
                    error={errors.password?.message || error}
                  />

                  <div>
                    <button className="px-8 py-1 rounded-lg bg-indigo-500 mt-3 text-white font-semibold hover:bg-indigo-400 w-full">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Login;
