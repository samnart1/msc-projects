import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "../shared/InputField";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { registerNewUser } from "../../store/action";
import Spinners from "../shared/Spinners";

const Register = () => {
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

    const registerHandler = async (data) => {
        console.log("Register has been clicked!");
        dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
    };

    return (
        <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] shadow-md shadow-gray-300 py-8 sm:px-8 px-4 rounded-md"
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <FaUserPlus className="text-slate-500 text-5xl" />
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        Register Here
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
                        label="Email"
                        id="email"
                        type="email"
                        errors={errors}
                        register={register}
                        required
                        message="*Email is required"
                        className=""
                        min=""
                        value=""
                        placeholder="Enter your Email"
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
                        <>Sign Up</>
                    )}
                </button>

                <p className="text-center text-sm text-slate-800 mt-6">
                    Already have an account?
                    <Link
                        to={"/login"}
                        className="font-semibold underline hover:text-black"
                    >
                        <span className="text-blue-600"> Login</span>
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
