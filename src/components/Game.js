import './Game.css';
import { useState, useRef } from 'react';

const Game = ({ verifyLetter, pickeCategory, pickeLetters, guessedLetters, wrongLetters, guesses, score}) => {
    const [letter, setLetter] = useState('');
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetter(letter)
        setLetter('')
        letterInputRef.current.focus();
    }

    return (
        <div className="Game">
            <p>Pontuação: <span>{score - 100}</span></p>
            <h1>Adivinhe a Palavra: </h1>
            <h3>Dica sobre a palavra: <span className='dica'>{pickeCategory}</span></h3>
            <p>Você ainda tem <span className='chances'>{guesses}</span> tentativas</p>
            <div className='word-container'>
                {pickeLetters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className='letter'> {letter.toUpperCase()} </span>
                    ) : (
                        <span key={i} className='blancksquare'>  </span>
                    )
                ))}
            </div>
            <div className='leeterContainer'>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='letter' maxLength='1' required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
                    <button type='submit'>Jogar</button>
                </form>
            </div>
            <div className='wrong-letters'>
                <p>Letras já utilizadas</p>
                <span>{wrongLetters.map((letter, i) => (
                    <span key={i}> {letter}, </span>
                ))}</span>
            </div>
        </div>
    )
}

export default Game;