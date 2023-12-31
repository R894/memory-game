import { useEffect, useState } from 'react';
import Card from './Card/Card';

export default function Game({cardCount, onReturnToMenu}) {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);


  //Whenever a card is clicked, update selectedCards and increment score by 1
  const handleCardClick = (data) => {
    if(!selectedCards.includes(data)){
      shuffle(cards);
      setSelectedCards([...selectedCards, data]);
      setScore(score + 1);
      console.log(score);
    }else{
      console.log("Game Over!")
      console.log(`Score: ${score}`)
      setIsGameOver(true);
    }
    
  }

  const handleReturnToMenu = () => {
    setScore(0);
    setSelectedCards([]);
    setIsGameOver(false);
    onReturnToMenu();
  }

  //Fetch a deck then draw {cardCount} of cards
  useEffect(() => {
    setIsLoading(true);

    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.json())
    .then(data => {
        fetch(`https://www.deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=${cardCount}`)
        .then(response => response.json())
        .then(card => {
          setCards(card.cards)
          setIsLoading(false);
        })
        .catch(error=> {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        })
      })
    .catch(error => console.error('Error fetching data:', error));
  }, [cardCount]);

  return (
    <>
    {isLoading ? (
      <p>Loading data...</p>
    ) : (
      <div className='flex flex-col items-center overflow-auto my-auto p-5 gap-4'>
        <div className='text-3xl'>
          Score: {score}
        </div>

        {!isGameOver? (
          <div className="grid grid-cols-6 grid-flow-row gap-3">
          {cards ? cards.map((card, index) => (<div key={index}><Card data={card} onCardClick={() => handleCardClick(card)}/></div>))
          : null}
          </div>
        ) : (<>
          {score > highScore ? setHighScore(score) : null}
          <div className='text-3xl'>Game Over!</div>
          <button onClick={handleReturnToMenu}>Return to Menu</button>
          
        </>)}
      </div>
      
    )}

    </>
  )
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
