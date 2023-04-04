import React, {useState} from "react"
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postUser, checkUserName } from "./Services";

export default function Signup(){
    
    const navigate = useNavigate();
    const { currentUser, register, updateUser, setError } = useAuth();

    const [loading, setLoading] = useState(false);
    const [signUpData, setSignUpData] = useState({
        email: "",
        password:"",
        confirmPassword:"",
        userName:""
    })

      useEffect(() => {
        updateUserName(currentUser)
      }, [currentUser]);

    function handleChange(event) {
        setSignUpData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function updateUserName(currentUser){
        try {
            await updateUser(currentUser, {displayName: signUpData.userName})
            postUser(currentUser)
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if(signUpData.password === signUpData.confirmPassword) {
            console.log("Successfully signed up")
        } else {
            console.log("Passwords do not match")
            return alert("Passwords do not match")
        }
        try {
            setLoading(true);
            await register(signUpData.email, signUpData.password);
          } catch (event) {
            if(event.code == 'auth/email-already-in-use'){
                alert('this email is already in use')
            }
            else{
                       alert("Failed to register");     
            }
          }
          setLoading(false);
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-20 py-10 mt-4 text-left bg-white shadow-lg" >
                <h3 className="text-2xl font-bold text-center">Register An Account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <div className="mt-4">
                            <h4 className="block font-bold" >User Name</h4>
                            <input
                                onChange={handleChange}
                                type='text' 
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                placeholder="User Name"
                                name="userName"
                                value={signUpData.userName}>
                            </input>
                        </div>
                        <div className="mt-4">
                            <h4 className="block font-bold" >Email</h4>
                            <input 
                                onChange={handleChange}
                                type='text' 
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                placeholder="Email"
                                name="email"
                                value={signUpData.email}>
                            </input>
                        </div>
                        <div className="mt-4" >  
                            <h4 className="block font-bold">Password</h4>
                            <input 
                                onChange={handleChange}
                                type='text' 
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                placeholder="password"
                                name="password"
                                value={signUpData.password}>
                            </input>
                        </div>
                        <div className="mt-4" >  
                            <h4 className="block font-bold">Confirm Password</h4>
                            <input 
                                onChange={handleChange}
                                type='text' 
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                placeholder=""
                                name="confirmPassword"
                                value={signUpData.confirmPassword}>
                            </input>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <button 
                                disabled={loading}
                                type="submit" 
                                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                                Login
                            </button>
                        </div>
                    <p className="mt-6 text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? 
                        <Link 
                            to={'/login'} 
                            class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600">
                            Login
                        </Link>
                    </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
<div className="dark:bg-gray-900">
<div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login To Your Account
            </h3>
            <form  className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="mt-4">
                    <div className="mt-4">
                        <h4 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Email</h4>
                        <input 
                            onChange={handleChange}
                            name="email"
                            type='text' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="email"
                            value={logInData.email}>
                        </input>
                    </div>
                    <div className="mt-4" >  
                        <h4 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</h4>
                        <input
                            onChange={handleChange} 
                            name="password"
                            type='text' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="password"
                            value={logInData.password}>
                        </input>
                    </div>
                    <span className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    <Link 
                        to={'/forgotpassword'} 
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600">
                        Forgot Password?
                    </Link>
                    </span>
                    <div className="flex items-baseline justify-between">
                        <button 
                            disabled={loading}
                            type="submit" 
                            className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                            Sign Up
                        </button>
                    </div>
                    <p className="mt-6 text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? 
                        <Link 
                            to={'/login'} 
                            class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600">
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</div>
</div>