import './startscreen.css';

const StartScreen = ({startGame}) => {
    return (
        <div className="StartScreen">
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para começar o jogo</p>
            <button onClick={startGame}>Começar o jogo</button>
        </div>
    )
}

export default StartScreen;