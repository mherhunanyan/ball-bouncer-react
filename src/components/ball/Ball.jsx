import { BALLSIZE } from 'Constants';
import './Ball.css';

export const Ball = (props) => {
    const { ballStyle } = props;
    const { left, color, top } = ballStyle;

    return (
        <span
            className="ball"
            style={{
                left,
                top,
                backgroundColor: color,
                width: BALLSIZE.width,
                height: BALLSIZE.height,
            }}
        ></span>
    );
};
