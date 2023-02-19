import React, {useState} from "react"
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        if (currentUser) {
          navigate("/login");
        }
      }, [currentUser, navigate]);

      function handleChange(event) {
        setSignUpData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
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
            console.log(signUpData.email);
            await register(signUpData.email, signUpData.password);
            let profile = {displayName: signUpData.userName}
            await updateUser(currentUser, profile)
            navigate("/");
          } catch (event) {
            alert("Failed to register");
          }
      
          setLoading(false);
    }

    const postSignUp = async () =>{
        let response = await axios.post()
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
                        <Link to={'/login'} 
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