import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

function Timer({ deadline, onFinish }) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const countDownDate = new Date(deadline).getTime();

        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(intervalId);
                onFinish();
                return;
            }

            setDays(Math.floor(distance / day));
            setHours(Math.floor((distance % day) / hour));
            setMinutes(Math.floor((distance % hour) / minute));
            setSeconds(Math.floor((distance % minute) / second));
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, [deadline, onFinish]);

    return (
        <div id="countdown">
            <ul>
                <li><span id="days">{days}</span>days</li>
                <li><span id="hours">{hours}</span>Hours</li>
                <li><span id="minutes">{minutes}</span>Minutes</li>
                <li><span id="seconds">{seconds}</span>Seconds</li>
            </ul>
        </div>
    );
}

export default Timer;