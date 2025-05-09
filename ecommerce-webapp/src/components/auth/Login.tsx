import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/action";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        console.log("Login has been clicked!");
        dispatch(
            authenticateSignInUser(data, toast, reset, navigate, setLoader)
        );
    };

    return (
        <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] shadow-md shadow-gray-300 py-8 sm:px-8 px-4 rounded-md"
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <AiOutlineLogin className="text-slate-500 text-5xl" />
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        Login Here
                    </h1>
                </div>
                <hr className="mt-2 mb-5 text-slate-300" />
                <div className="flex flex-col gap-4">
                    <InputField
                        label="UserName"
                        id="username"
                        type="text"
                        errors={errors}
                        register={register}
                        required
                        message="*UserName is required"
                        className=""
                        min=""
                        value=""
                        placeholder="Enter your username"
                    />
                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        errors={errors}
                        register={register}
                        required
                        message="*Password is required"
                        className=""
                        min="6"
                        value=""
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    disabled={loader}
                    className="bg-blue-500 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
                    type="submit"
                >
                    {loader ? (
                        <>
                            {" "}
                            <Spinners />
                            Loading...
                        </>
                    ) : (
                        <>Login</>
                    )}
                </button>

                <p className="text-center text-sm text-slate-800 mt-6">
                    Don't have an account?
                    <Link
                        to={"/register"}
                        className="font-semibold underline hover:text-black"
                    >
                        <span className="text-blue-600"> Signup</span>
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
