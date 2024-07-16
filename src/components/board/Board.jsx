import './Board.css';

export const Board = (props) => {
    const { left } = props;
    return <span className="board" style={{ left }}></span>;
};
