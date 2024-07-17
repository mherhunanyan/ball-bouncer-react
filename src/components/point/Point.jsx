import './Point.css';

export const Point = (props) => {
    const { point } = props;

    return <div className="point">{point}</div>;
};
