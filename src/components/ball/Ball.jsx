import './Ball.css';
import { ball as sizeBall } from 'Constants';

export const Ball = (props) => {
    const { ball } = props;
    const {left, top, color} = ball;
    return (
        <span
            className="ball"
            style={{
                width: sizeBall.width,
                height: sizeBall.height,
                left: left,
                top: top,
                backgroundColor: color,
            }}
        ></span>
    );
};
