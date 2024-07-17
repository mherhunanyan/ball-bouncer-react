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

export const Card = (props) => {
    const { setPoint } = props;
    const cb = useRef(() => {});
    const cb2 = useRef(() => {});
    // const pointRef = useRef(0); // 2 way
    const boardPositionRef = useRef(0);
    const [balls, setBalls] = useState([]);
    const [boardPosition, setBoardPosition] = useState(0);

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
                        ballLeft: getRandomNumber(
                            0,
                            CARDSIZE.width - BALLSIZE.width,
                        ),
                        ballColor: getRandomColor(BALL_COLOR),
                        id: Math.random(),
                        ballTop: 0,
                    },
                ]);
            }
            tikTime++;
        };

        cb2.current = () => {
            setBalls((prevBalls) =>
                prevBalls.reduce((newBalls, ball) => {
                    const maxTop = CARDSIZE.height;
                    const { ballTop, ballLeft, ballColor } = ball;
                    const increasedTop = ballTop + 10;
                    if (
                        ballTop >=
                            maxTop -
                                BALLSIZE.height -
                                BOARDSIZE.height -
                                BOARDSIZE.additionalSize &&
                        ballTop < maxTop &&
                        ballLeft >=
                            boardPositionRef.current - BALLSIZE.width / 2 &&
                        ballLeft <= boardPositionRef.current + BOARDSIZE.width
                    ) {
                        // this point i want to increase user points
                        // setPoint((prevPoint) => prevPoint + 10); // 1 way
                        // pointRef.current += 10; // 2 way
                        return newBalls;
                    } else if (ballTop === maxTop) {
                        return newBalls;
                    } else {
                        newBalls.push({
                            ...ball,
                            ballTop: ballTop >= maxTop ? ballTop : increasedTop,
                        });
                        return newBalls;
                    }
                }, []),
            );
        };
    });

    // 2 way
    // useEffect(() => {
    //     setPoint(pointRef.current);
    // }, [pointRef.current, setPoint]);

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
