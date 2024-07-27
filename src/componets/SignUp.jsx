import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from './index';
import { useForm } from 'react-hook-form';
 

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state

    const createAccount = async (data) => {
        setError("");
        setLoading(true); // Set loading state to true
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Set loading state to false
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl">
                <div className="flex justify-center">
                    <Logo width="100%" />
                </div>
                <h2 className="text-3xl font-extrabold text-center text-white">Sign up to create account</h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                        Login
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                {loading && (
                    <div className="flex justify-center mt-4">
                        <div className="loader"></div> {/* Add your loading spinner here */}
                    </div>
                )}
                <form onSubmit={handleSubmit(createAccount)} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4">
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("name", { required: true })}
                            className="relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-black bg-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address",
                                },
                            })}
                            className="relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-black bg-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                            className="relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-black bg-gray-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                            disabled={loading} // Disable the button while loading
                        >
                            {loading ? "Creating Account..." : "Create Account"} 
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
