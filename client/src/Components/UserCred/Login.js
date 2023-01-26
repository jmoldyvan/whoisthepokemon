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
          navigate("/");
          window.location.reload()
        } catch (e) {
            console.log(e);
            alert(`Failed to register:  ${e.code}`);     
            
        }
        setLoading(false);
      }

    return(
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
                                        type="submit" 
                                        className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                                        Login
                                    </button>
                                </div>
                                <p className="www mt-6 text-sm font-light text-gray-500 dark:text-gray-400">
                                    Dont have an account yet? 
                                    <Link 
                                        to={'/signup'} 
                                        class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600">
                                        {` Sign up`}
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
