import { board } from 'Constants';
import './Board.css';

export const Board = (props) => {
    const { boardLeft } = props;

    return (
        <span
            className="board"
            style={{
                width: board.width,
                height: board.height,
                left: boardLeft,
            }}
        ></span>
    );
};
