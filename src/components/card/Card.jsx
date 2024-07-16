import { BALLSIZE, BALL_COLOR, CARDSIZE, GAME_FINISH_TIME } from 'Constants';
import { getRandomNumber } from 'utils/GetRandomNumber';
import { getRandomColor } from 'utils/GetRandomColor';
import { useEffect, useRef, useState } from 'react';
import { Board } from 'components/board/Board';
import { Ball } from 'components/ball/Ball';
import './Card.css';

export const Card = () => {
    const [balls, setBalls] = useState([]);
    const cb = useRef(() => {});

    useEffect(() => {
        const intervalId = setInterval(cb.current, 1000);
        const timeoutId = setTimeout(
            () => clearInterval(intervalId),
            GAME_FINISH_TIME,
        );
        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        let tikTime = 1;
        cb.current = () => {
            if (tikTime % 5 === 0 || tikTime % 5 > 2) {
                setBalls((prevBalls) => [
                    ...prevBalls,
                    {
                        left: getRandomNumber(
                            0,
                            CARDSIZE.width - BALLSIZE.width,
                        ),
                        color: getRandomColor(BALL_COLOR),
                        id: Math.random(),
                    },
                ]);
            }
            tikTime++;
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
            <Board />
        </div>
    );
};
