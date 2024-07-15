import { CARDSIZE } from 'Constants';
import './Card.css';
import { useEffect, useRef, useState } from 'react';
import { getRandomNumber } from 'helper/GetRandomNumber';

export const Card = () => {
    const [balls, setBalls] = useState([]);
    const cb = useRef(() => {});

    useEffect(() => {
        const id = setInterval(cb.current, 1000);
        return () => clearInterval(id);
    }, []);

    // useEffect(() => {
    //     cb.current = () => {
    //         setBalls([...balls, {left: getRandomNumber, color: }])
    //     }
    // })

    return (
        <div
            className="card"
            style={{ width: CARDSIZE.width, height: CARDSIZE.height }}
        >
            {balls.map((ball) => (
                <span left={ball.left} color={ball.color}></span>
            ))}
        </div>
    );
};
