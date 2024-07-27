import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from './index';
import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const login = async (data) => {

        setError("");
        setLoading(true);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl">
                <div className="flex justify-center">
                    <Logo width="100%" />
                </div>
                <h2 className="text-3xl font-extrabold text-center text-white">Login to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Don't have an account?&nbsp;
                    <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                {loading && (
                    <div className="flex justify-center mt-4">
                        <div className="loader"></div> {/* Add your loading spinner here */}
                    </div>
                )}
                <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="e.g Kazama@gmail.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Email address must be a valid address",
                            },
                        })}
                        labelClassName="text-white" // Apply text-white class directly to label
                        inputClassName="block w-full px-3 py-2 placeholder-gray-400 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter a Strong Password"
                        {...register("password", { required: "Password is required" })}
                        // ClassName="block w-full px-3 py-2 placeholder-black text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-4"
                    />
                    <div className="mt-4">
                        <Button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                             {loading ? "Logging in ..." : "Login Account"} 
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
