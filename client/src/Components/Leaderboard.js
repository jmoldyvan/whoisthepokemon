import React, {useState, useEffect} from "react"
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { getAllHighScore } from "./Services";

export default function Login(){
    const navigate = useNavigate(); 
    const { currentUser, setError } = useAuth();
    const [logInData, setLogInData] = useState({
        email: "",
        password:"",
    })

    useEffect(() => {
        getAllHighScore()
      }, []);


    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-20 py-10 mt-4 text-left bg-white shadow-lg" >
                <h3 className="text-2xl font-bold text-center">Best Of The Best</h3>
            </div>
        </div>
    )
}