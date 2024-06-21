import { createContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = (props) => {
    const { children } = props;

    const [isGameStart, setIsGameStart] = useState(false);
    const [balls, setBalls] = useState([]);

    return (
        <GameContext.Provider
            value={{ balls, setBalls, isGameStart, setIsGameStart }}
        >
            {children}
        </GameContext.Provider>
    );
};
