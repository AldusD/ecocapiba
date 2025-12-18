import { useEffect, useState } from "react";
import Icons from "../../../../../shared/Icons";
import { TimerStyles } from "./styles";

export default function Timer({ startTime, triggerTimeEnded }) {
    const [time, setTime] = useState(startTime);
    const ONE_SECOND = 1000;

    useEffect(() => {
        if (time <= 0) {
            triggerTimeEnded();
            return;
        }

        const timerInterval = setInterval(() => {
            setTime(t => t -1);
        }, ONE_SECOND);

        return () => clearInterval(timerInterval);
    }, [time])

    return (
        <TimerStyles>
            <span className="counter" >{time}</span>
            <Icons.CLOCK />
        </TimerStyles>
    )
}