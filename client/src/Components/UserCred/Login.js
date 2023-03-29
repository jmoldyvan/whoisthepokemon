import React, {useState, useEffect} from "react"
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate(); 
    const { currentUser, login, setError } = useAuth();
    const [loading, setLoading] = useState(false);
    const [logInData, setLogInData] = useState({
        email: "",
        password:"",
    })

    useEffect(() => {
        if (currentUser) {
          navigate("/");
        }
      }, [currentUser, navigate]);

    function handleChange(event) {
        setLogInData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
          setError("");
          setLoading(true);
          await login(logInData.email, logInData.password);
        //   await getUser(currentUser)
          navigate("/");
        } catch (e) {
          setError("Failed to login");
        }
        setLoading(false);
      }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-20 py-10 mt-4 text-left bg-white shadow-lg" >
                <h3 className="text-2xl font-bold text-center">Login To Your Account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <div className="mt-4">
                            <h4 className="block font-bold" >Email</h4>
                            <input 
                                onChange={handleChange}
                                name="email"
                                type='text' 
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                placeholder="email"
                                value={logInData.email}>
                            </input>
                        </div>
                        <div className="mt-4" >  
                            <h4 className="block font-bold">Password</h4>
                            <input
                                onChange={handleChange} 
                                name="password"
                                type='text' 
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                placeholder="password"
                                value={logInData.password}>
                            </input>
                        </div>
                        <span className="text-sm text-blue-600 hover:underline">
                        <Link 
                            to={'/forgotpassword'} 
                            class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600">
                            Forgot Password?
                        </Link>
                        </span>
                        <div className="flex items-baseline justify-between">
                            <button 
                                type="submit" 
                                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                                Login
                            </button>
                        </div>
                        <p className="mt-6 text-sm font-light text-gray-500 dark:text-gray-400">
                            Dont have an account yet? 
                            <Link 
                                to={'/signup'} 
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}