import './App.css';
import StartScreen from './components/startscreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

import { useState, useEffect, useCallback } from 'react';
import { wordsList } from './data/words';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]

function App() {
  const [words] = useState(wordsList)
  const [ gameStage, setGameStage ] = useState(stages[0].name);

  const [ pickeCategory, setPickeCategory ] = useState('');
  const [ pickeLetters, setPickeLetters ] = useState([]);

  const [ guessedLetters, setGuessedLetters ] = useState([]);
  const [ wrongLetters, setWrongLetters ] = useState([]);
  const [ guesses, setGuesses ] = useState(3);
  const [ score, setScore ] = useState(0);

  const pickWordandCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return { category, word };
  }, [words])

  //Começa o jogo
  const startGame = useCallback(() => {
    clearLetterStates();
    //Pick word and pick category
    const { word, category } = pickWordandCategory();

    //Create an Array of Letters
    let wordLetters = word.split('');
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //Fill States
    setPickeCategory(category)
    setPickeLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordandCategory])

  //Process Letter
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if ( guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter) ) {
      alert('Você já acertou ou errou essa letra')
      return
    }

    if (pickeLetters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  function clearLetterStates() {
    setGuessedLetters([]);
    setWrongLetters([]);
    setGuesses(3)
    setScore(0)
  }

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetter = [...new Set(pickeLetters)]

    if (guessedLetters.length === uniqueLetter.length) {
      setScore(actualScore => actualScore += 100);
      startGame();
    }
  }, [guessedLetters, pickeLetters, startGame])

  //Retry Game
  const retryGame = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      { gameStage === 'start' && <StartScreen startGame={startGame} /> }
      { gameStage === 'game' && <Game 
        verifyLetter={verifyLetter} 
        pickeCategory={pickeCategory} 
        pickeLetters={pickeLetters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      /> }
      { gameStage === 'end' && <GameOver retryGame={retryGame} score={score} /> }
    </div>
  );
}

export default App;
