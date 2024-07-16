import { useEffect, useRef, useState } from 'react';
import './Timer.css';
import { FORMATTEDTIME } from 'Constants';

export const Timer = () => {
    const [timer, setTimer] = useState(FORMATTEDTIME);
    const cb = useRef(() => {});

    useEffect(() => {
        const id = setInterval(cb.current, 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        cb.current = () => {
            setTimer((prevTimer) => {
                let currHour = +prevTimer[0].concat(prevTimer[1]);
                let currSecond = +prevTimer[3].concat(prevTimer[4]);
                if (currSecond === 0) {
                    if (currHour > 0) {
                        currHour--;
                        currSecond = 59;
                    } else {
                        return prevTimer;
                    }
                } else {
                    currSecond--;
                }
                if (currHour < 10) {
                    currHour = `0${currHour}`;
                } else {
                    currHour = `${currHour}`;
                }
                if (currSecond < 10) {
                    currSecond = `0${currSecond}`;
                    return `${currHour}:${currSecond}`;
                } else {
                    currSecond = `${currSecond}`;
                    return `${currHour}:${currSecond}`;
                }
            });
        };
    });

    return <div className="timer">{timer}</div>;
};
