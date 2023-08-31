import { useState } from "react";
import Game from "../components/Game";

export default function Menu(){
    const [count, setCount] = useState(0);
    const [startGame, setStartGame] = useState(false);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;

        setCount(parseInt(inputValue));
    }
    const onButtonClick = () => { setStartGame(true)}


    return(
        <div className="h-full w-full bg-lime-500 flex justify-center items-center">
            {!startGame && (
                <div className="flex flex-col max-w-[50%] items-center bg-lime-500">
                    <div>Select amount of cards</div>
                    <input type='text' onChange={handleInputChange}/>
                    <button onClick={onButtonClick}>Start</button>
                </div>
            )}
            {startGame && <Game cardCount={count}/>}
        </div>
    );
}