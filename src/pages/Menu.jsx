import { useState } from "react";
import Game from "../components/Game";

export default function Menu(){
    const [count, setCount] = useState(15);
    const [startGame, setStartGame] = useState(false);


    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if(parseInt(inputValue) > 1){
            setCount(parseInt(inputValue));
        }
    }

    const onButtonClick = () => { 
        if(count > 1){
            setStartGame(true);
        }
    }


    return(
        <div className="h-full w-full bg-lime-500 flex justify-center items-center">
            {!startGame && (
                <div className="flex flex-col max-w-[50%] items-center bg-lime-500">
                    <div>Select amount of cards</div>
                    <input className='text-center' type='number' placeholder="15" onChange={handleInputChange}/>
                    <button onClick={onButtonClick}>Start</button>
                </div>
            )}
            {startGame && <Game cardCount={count} onReturnToMenu={() =>setStartGame(false)}/>}
        </div>
    );
}