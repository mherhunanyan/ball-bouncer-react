import { BALLSIZE } from 'Constants';

export const Ball = () => {
    return (
        <span
            className="ball"
            style={{ width: BALLSIZE.width, height: BALLSIZE.height }}
        ></span>
    );
};
