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
    const cb2 = useRef(() => {});
    const boardPositionRef = useRef(0);

    const keyDownHandler = (e) => {
        if (e.code === 'ArrowLeft') {
            const minBoardPosition = 0;
            setBoardPosition((prevPosition) => {
                if (prevPosition > minBoardPosition) {
                    boardPositionRef.current = prevPosition - 20;
                    return (prevPosition -= 20);
                } else {
                    return prevPosition;
                }
            });
        } else if (e.code === 'ArrowRight') {
            const maxBoardPosition = CARDSIZE.width - BOARDSIZE.width;
            setBoardPosition((prevPosition) => {
                if (prevPosition < maxBoardPosition) {
                    boardPositionRef.current = prevPosition + 20;
                    return (prevPosition += 20);
                } else {
                    return prevPosition;
                }
            });
        }
    };

    useEffect(() => {
        const intervalId = setInterval(cb.current, 1000);
        const intervalId2 = setInterval(cb2.current, 80);
        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
        }, GAME_FINISH_TIME);
        window.addEventListener('keydown', keyDownHandler);

        return () => {
            clearInterval(intervalId);
            clearInterval(intervalId2);
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
                        top: 0,
                    },
                ]);
            }
            tikTime++;
        };

        cb2.current = () => {
            setBalls((prevBalls) =>
                prevBalls.reduce((newBalls, ball) => {
                    const maxTop = CARDSIZE.height;
                    const increasedTop = ball.top + 10;
                    const currBallTop = ball.top;
                    if (
                        currBallTop >=
                            maxTop -
                                BALLSIZE.height -
                                BOARDSIZE.height -
                                BOARDSIZE.additionalSize &&
                        ball.left >=
                            boardPositionRef.current - BALLSIZE.width / 2 &&
                        ball.left <= boardPositionRef.current + BOARDSIZE.width
                    ) {
                        return newBalls;
                    }
                    newBalls.push({
                        ...ball,
                        top: currBallTop >= maxTop ? currBallTop : increasedTop,
                    });
                    return newBalls;
                }, []),
            );
        };
    });

    return (
        <div
            className="card"
            style={{ width: CARDSIZE.width, height: CARDSIZE.height }}
        >
            {balls.map((ball) => (
                <Ball ballStyle={ball} key={ball.id} />
            ))}
            <Board left={boardPosition} />
        </div>
    );
};
