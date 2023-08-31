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
        <div>
            {!startGame && (
                <>
                    <input type='text' onChange={handleInputChange}/>
                    <button onClick={onButtonClick}>Start</button>
                </>
            )}
            {startGame && <Game cardCount={count}/>}
        </div>
    );
}