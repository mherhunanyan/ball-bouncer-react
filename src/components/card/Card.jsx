import { BALLSIZE, BALL_COLOR, CARDSIZE } from 'Constants';
import { getRandomNumber } from 'utils/GetRandomNumber';
import { getRandomColor } from 'utils/GetRandomColor';
import { useEffect, useRef, useState } from 'react';
import { Ball } from 'components/ball/Ball';
import './Card.css';

export const Card = () => {
    const [balls, setBalls] = useState([]);
    const cb = useRef(() => {});

    useEffect(() => {
        const id = setInterval(cb.current, 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        cb.current = () => {
            setBalls((prevBalls) => [
                ...prevBalls,
                {
                    left: getRandomNumber(0, CARDSIZE.width - BALLSIZE.width),
                    color: getRandomColor(BALL_COLOR),
                    id: Math.random(),
                },
            ]);
        };
    });

    return (
        <div
            className="card"
            style={{ width: CARDSIZE.width, height: CARDSIZE.height }}
        >
            {balls.map((ball) => (
                <Ball left={ball.left} color={ball.color} key={ball.id}></Ball>
            ))}
        </div>
    );
};
