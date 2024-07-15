import { BALLSIZE } from 'Constants';
import './Ball.css';

export const Ball = (props) => {
    const { left, color } = props;
    return (
        <span
            className="ball"
            style={{
                width: BALLSIZE.width,
                height: BALLSIZE.height,
                left,
                backgroundColor: color,
            }}
        ></span>
    );
};
