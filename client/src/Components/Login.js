import React, {useState, useEffect} from "react"
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "./Services";

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

    // async function getUserFromDB(currentUser){
    //     try {
    //         console.log(currentUser);
    //         getUser(currentUser)
    //         // navigate("/");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    //   useEffect(() => {
    //     getUserFromDB(currentUser)
    //   }, [currentUser]);
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
                            Forgot Password?
                        </span>
                        <div className="flex items-baseline justify-between">
                            <button 
                                type="submit" 
                                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                                Login
                            </button>
                        </div>
                        <p className="mt-6 text-sm font-light text-gray-500 dark:text-gray-400">
                      Dont have an account yet? <Link to={'/signup'} class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600">
                        Sign up</Link>
                  </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

// better??
{/* <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          Flowbite    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="????????????????????????" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don???t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section> */}