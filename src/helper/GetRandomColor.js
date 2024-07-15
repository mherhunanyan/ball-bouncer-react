import { BALL_COLOR } from "Constants";

export const getRandomColor = () => {
    return BALL_COLOR[BALL_COLOR.length * Math.random()]
};
