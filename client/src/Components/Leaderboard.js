import React, {useState, useEffect} from "react"
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { getAllHighScore } from "./Services";
import { XCircleIcon } from "@heroicons/react/solid";

export default function Leaderboard(props){
    const navigate = useNavigate(); 
    const { currentUser, setError } = useAuth();
    const [highScoreList, sethighScoreList] = useState()
    // const [logInData, setLogInData] = useState({
    //     email: "",
    //     password:"",
    // })

    useEffect(() => {
        fillInLeaderboard()
      }, []);

    async function fillInLeaderboard(){
        try {
            let allHighScores = await getAllHighScore()
            sethighScoreList(allHighScores)            
        } catch (error) {
            console.log(error);
        }

      }


    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-20 py-10 mt-4 text-left bg-white shadow-lg" >
                <XCircleIcon
                    onClick={() => props.handleLeaderboard()}
                    className="w-5 text-red-400"
                    aria-hidden="true"
                />
                <h3 className="text-2xl font-bold text-center">Leaderboard</h3>
                <div className="flex justify-between">
                    <h1>user</h1>
                    <h1>highScore</h1>
                </div>
                {highScoreList ? 
                    highScoreList.map((elementObject) =>{
                        const { highScore, user } = elementObject;
                        return (
                            <div className="flex justify-between">
                                <h1>{user}</h1>
                                <h1>{highScore}</h1>
                            </div>
                        )
                    })
                : null}
            </div>
        </div>
    )
}