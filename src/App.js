import "./App.css";
import { Card } from "./components/card/Card";
import { GameProvider } from "./context/GameContext";

function App() {
    return (
        <div className="App">
            <GameProvider>
                <Card />
            </GameProvider>
        </div>
    );
}

export default App;
