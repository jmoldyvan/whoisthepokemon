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
            let allHighScores = await getAllHighScore()
            sethighScoreList(allHighScores)            
        } catch (error) {
            console.log(error);
        }
      }


    return(
            <div >
                <div className={`poke-options-2`} >
                    <XCircleIcon
                        onClick={() => props.handleLeaderboard()}
                        className="w-5 text-red-400"
                        aria-hidden="true"
                    />
                    <h3 className="text-2xl font-bold text-center">Leaderboard</h3>
                    <div className={`poke-options-2-button`}>
                        <h1>USER</h1>
                        <h1>HIGHSCORE</h1>
                    </div>
                    {highScoreList ? 
                        highScoreList.map((elementObject) =>{
                            const { highScore, user } = elementObject;
                            return (
                                <div  className={`poke-options-2-button`}>
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