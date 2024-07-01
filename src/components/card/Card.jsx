import { useContext, useEffect, useState, useRef } from 'react';
import { ball, board, card, colors, finalTime } from 'Constants';
import './Card.css';
import { GameContext } from 'context/GameContext';
// import { Timer } from 'helper/Timer';
import { getRandomNum } from 'helper/getRandomNum';
import { getRandomColor } from 'helper/getRandomColor';
import { Ball } from 'components/ball/Ball';
import { Board } from 'components/board/Board';

// const timer = new Timer();
// timer.run(1000);

export const Card = (props) => {
    const { balls, setBalls } = useContext(GameContext);
    const maxTop = card.height + card.marginTop - ball.height;
    const [boardLeft, setBoardLeft] = useState(card.marginLeft);
    const cb1 = useRef(() => {});
    const cb2 = useRef(() => {});

    const getRandomBallPlace = () => {
        return getRandomNum(0, card.width - ball.width);
    };

    useEffect(() => {
        let time1 = 0;
        let time2 = 0;
        const id1 = setInterval(() => {
            time1++;
            cb1.current(time1);
        }, 1000);
        const id2 = setInterval(() => {
            time2++;
            cb2.current(time2);
        }, 90);
        return () => {
            clearInterval(id1);
            clearInterval(id2);
        };
    }, []);

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.code === 'ArrowLeft') {
                if (boardLeft > card.marginLeft) {
                    setBoardLeft((prev) => (prev -= 20));
                }
            } else if (event.code === 'ArrowRight') {
                if (boardLeft < card.marginLeft + card.width - board.width) {
                    setBoardLeft((prev) => (prev += 20));
                }
            }
        };
        window.addEventListener('keydown', keyDownHandler);
        return () => window.removeEventListener('keydown', keyDownHandler);
    });

    useEffect(() => {
        cb1.current = (time) => {
            const mn = time % 5;
            if (mn <= 3 && mn >= 1) {
                setBalls([
                    ...balls,
                    {
                        left: getRandomBallPlace(),
                        color: getRandomColor(colors),
                        top: ball.marginTop,
                        id: Math.random(),
                    },
                ]);
            }
        };
    });

    useEffect(() => {
        cb2.current = () => {
            setBalls(
                balls.map((ball) => {
                    const newTop = ball.top + 10;
                    return {
                        ...ball,
                        top: newTop > maxTop ? maxTop : newTop,
                    };
                }),
            );
        };
    });

    return (
        <div
            className="card"
            style={{ height: card.height, width: card.width }}
        >
            {balls.map((ball) => (
                <Ball ball={ball} />
            ))}
            <Board boardLeft={boardLeft} />
        </div>
    );
};
