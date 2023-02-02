import React, {useState, useEffect} from "react"
import { getAllHighScore } from "../UserCred/Services";
import { XCircleIcon } from "@heroicons/react/solid";

export default function Leaderboard(props){
    const [highScoreList, sethighScoreList] = useState()

    useEffect(() => {
        fillInLeaderboard()
    }, []);

    async function fillInLeaderboard(){
        try {
            console.log('leader');
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
                : []}
            </div>
        </div>
    )
}