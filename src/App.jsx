import { Timer } from 'components/timer/Timer';
import { Point } from 'components/point/Point';
import { Card } from 'components/card/Card';
import { useState } from 'react';
import './App.css';

function App() {
    const [point, setPoint] = useState(0);

    return (
        <div className="app">
            <Card setPoint={setPoint} />
            <div className="timer-point-container">
                <Timer />
                <Point point={point} />
            </div>
        </div>
    );
}

export default App;
