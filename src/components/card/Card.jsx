import { useContext, useEffect } from 'react';
import { ball, card, colors } from '../../Constants';
import './Card.css';
import { GameContext } from 'context/GameContext';
import { Timer } from 'helper/Timer';
import { getRandomNum } from 'helper/getRandomNum';
import { getRandomColor } from 'helper/getRandomColor';
import { Ball } from 'components/ball/Ball';

export const Card = () => {
    const { balls, setBalls } = useContext(GameContext);

    useEffect(() => {
        const timer = new Timer();
        timer.run(5000);
        timer.on(() => {
            const getRandomBallPlace = () => {
                return getRandomNum(
                    card.marginLeft,
                    card.marginLeft + card.width,
                );
            };
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

        return () => timer.unSubscribe();
    }, [setBalls]);

    return (
        <div
            className="card"
            style={{ height: card.height, width: card.width }}
        >
            {balls.map((ball) => (
                <Ball left={ball.left} color={ball.color} key={ball.id} />
            ))}
        </div>
    );
};
