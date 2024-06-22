import { useContext, useEffect } from 'react';
import { ball, card, colors, finalTime } from 'Constants';
import './Card.css';
import { GameContext } from 'context/GameContext';
import { Timer } from 'helper/Timer';
import { getRandomNum } from 'helper/getRandomNum';
import { getRandomColor } from 'helper/getRandomColor';
import { Ball } from 'components/ball/Ball';

export const Card = () => {
    const { balls, setBalls } = useContext(GameContext);
    const maxTop = card.height + card.marginTop - ball.height;

    const getRandomBallPlace = () => {
        return getRandomNum(
            card.marginLeft,
            card.marginLeft + card.width - ball.width,
        );
    };

    useEffect(() => {
        const timer = new Timer();
        timer.run(5000);
        timer.on(() => {
            const nestedTimer = new Timer();
            nestedTimer.run(1000);
            nestedTimer.on(() => {
                setBalls((prevBalls) => [
                    ...prevBalls,
                    {
                        left: getRandomBallPlace(),
                        color: getRandomColor(colors),
                        top: ball.marginTop,
                        id: `${Math.random() * 7}`,
                    },
                ]);
            });
            nestedTimer.stop(3000);
        });
        timer.stop(finalTime);

        return () => timer.unSubscribe();
    }, [setBalls]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBalls((prevBalls) => {
                return prevBalls.map((ball) => {
                    const newTop = ball.top + 10;
                    return {
                        ...ball,
                        top: newTop > maxTop ? maxTop : newTop,
                    };
                });
            });
        }, ball.speed.bottom);

        return () => clearInterval(interval);
    }, [setBalls, maxTop]);

    return (
        <div
            className="card"
            style={{ height: card.height, width: card.width }}
        >
            {balls.map((ball) => (
                <Ball
                    left={ball.left}
                    color={ball.color}
                    key={ball.id}
                    top={ball.top}
                />
            ))}
        </div>
    );
};
