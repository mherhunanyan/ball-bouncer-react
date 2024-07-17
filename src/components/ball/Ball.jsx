import { BALLSIZE } from 'Constants';
import './Ball.css';

export const Ball = (props) => {
    const { ballStyle } = props;
    const { ballLeft, ballColor, ballTop } = ballStyle;

    return (
        <span
            className="ball"
            style={{
                left: ballLeft,
                top: ballTop,
                backgroundColor: ballColor,
                width: BALLSIZE.width,
                height: BALLSIZE.height,
            }}
        ></span>
    );
};
