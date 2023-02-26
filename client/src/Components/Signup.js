import React from "react"

export default function Signup(){


    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-20 py-10 mt-4 text-left bg-white shadow-lg" >
                <h3 className="text-2xl font-bold text-center">Login To Your Account</h3>
                <form>
                    <div className="mt-4">
                        <div className="mt-4">
                            <h4 className="block font-bold" >Email</h4>
                            <input type='text' className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="email"></input>
                        </div>
                        <div className="mt-4" >  
                            <h4 className="block font-bold">Password</h4>
                            <input type='text' className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="password"></input>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <button type="submit" className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                        </div>
                        <p className="mt-6 text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600">Login</a>
                  </p>
                    </div>
                </form>
            </div>
        </div>
    )
}