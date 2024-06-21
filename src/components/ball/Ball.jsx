import './Ball.css';
import { ball } from 'Constants';

export const Ball = (props) => {
    const { left, color, top } = props;
    return (
        <span
            className="ball"
            style={{
                width: ball.width,
                height: ball.height,
                left: left,
                top: top,
                backgroundColor: color,
            }}
        ></span>
    );
};
