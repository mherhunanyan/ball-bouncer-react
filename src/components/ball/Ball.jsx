import './Ball.css';
import { ball } from 'Constants';

export const Ball = (props) => {
    const { left, color } = props;
    return (
        <span
            className="ball"
            style={{
                width: ball.width,
                height: ball.height,
                left: left,
                backgroundColor: color,
            }}
        ></span>
    );
};
