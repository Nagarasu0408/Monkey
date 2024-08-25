import React, { useRef, useState } from "react";
import "../CSS/Timer.css";

export default function Timer() {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    let timeInterval = useRef(null);

    const handleStart = () => {
        if (isRunning) return;
        setIsRunning(true);
        timeInterval.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 10);
    };

    const handlePause = () => {
        if (!isRunning) return;
        setIsRunning(false);
        clearInterval(timeInterval.current);
    };

    const handleReset = () => {
        setIsRunning(false);
        clearInterval(timeInterval.current);
        setTimer(0);
    };

    const formatTime = (timer) => {
        const minutes = Math.floor(timer / 60000)
            .toString()
            .padStart(2, "0");
        const seconds = Math.floor((timer / 1000) % 60)
            .toString()
            .padStart(2, "0");
        const milliseconds = (timer % 1000).toString().padStart(3, "0");

        return { minutes, seconds, milliseconds };
    };

    const { minutes, seconds, milliseconds } = formatTime(timer);

    return (
        <div className="App">
            <div className="timer-container">
                <div className="timer-box">
                    <h1>{minutes}</h1>
                </div>
                <span className="colon">:</span>
                <div className="timer-box">
                    <h1>{seconds}</h1>
                </div>
                <span className="colon">:</span>
                <div className="timer-box">
                    <h1>{milliseconds}</h1>
                </div>
            </div>
            <div className="button-container">
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
}
