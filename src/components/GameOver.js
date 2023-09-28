import './GameOver.css';

const GameOver = ({retryGame, score}) => {
    return (
        <div className="GameOver">
            <h1>Game Over</h1>
            <p>Sua pontuação foi de: <span>{score}</span></p>
            <button onClick={retryGame}>Jogar Novamente</button>
        </div>
    )
}

export default GameOver;