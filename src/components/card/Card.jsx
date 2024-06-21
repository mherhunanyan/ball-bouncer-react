import { card } from "../../Constants";
import "./Card.css";

export const Card = () => {
    
    return (
        <div
            className="card"
            style={{ height: card.height, width: card.width }}
        ></div>
    );
};
