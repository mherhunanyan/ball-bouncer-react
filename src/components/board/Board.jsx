import { board } from 'Constants';
import './Board.css';

export const Board = () => {
    return (
        <span
            className="board"
            style={{ width: board.width, height: board.height }}
        ></span>
    );
};
