import { CARDSIZE } from 'Constants';
import './Card.css';
import { useEffect, useRef, useState } from 'react';
import { getNumber } from 'helper/getRandomNumber';

export const Card = () => {
    const [balls, setBalls] = useState([]);
    const cb = useRef(() => {});

    useEffect(() => {
        const id = setInterval(cb.current, 1000);

        return () => clearInterval(id);
    }, [])

    useEffect(() => {
        cb.current = () => {
            setBalls([...balls, {left: getNumber}])   
        }
    })

    return (
        <div
            className="card"
            style={{ width: CARDSIZE.width, height: CARDSIZE.heigth }}
        ></div>
    );
};
