import { getRandomNumber } from 'utils/GetRandomNumber';
import { getRandomColor } from 'utils/GetRandomColor';
import { useEffect, useRef, useState } from 'react';
import { Board } from 'components/board/Board';
import { Ball } from 'components/ball/Ball';
import './Card.css';
import {
    BALLSIZE,
    BALL_COLOR,
    BOARDSIZE,
    CARDSIZE,
    GAME_FINISH_TIME,
} from 'Constants';

export const Card = () => {
    const [balls, setBalls] = useState([]);
    const [boardPosition, setBoardPosition] = useState(0);
    const cb = useRef(() => {});

    const keyDownHandler = (e) => {
        if (e.code === 'ArrowLeft') {
            const minBoardPosition = 0;
            setBoardPosition((prevPosition) => {
                if (prevPosition > minBoardPosition) {
                    return (prevPosition -= 20);
                } else {
                    return prevPosition;
                }
            });
        } else if (e.code === 'ArrowRight') {
            const maxBoardPosition = CARDSIZE.width - BOARDSIZE.width;
            setBoardPosition((prevPosition) => {
                if (prevPosition < maxBoardPosition) {
                    return (prevPosition += 20);
                } else {
                    return prevPosition;
                }
            });
        }
    };

    useEffect(() => {
        const intervalId = setInterval(cb.current, 1000);
        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
        }, GAME_FINISH_TIME);
        window.addEventListener('keydown', keyDownHandler);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            window.removeEventListener('keydown', keyDownHandler);
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
            <Board left={boardPosition} />
        </div>
    );
};
