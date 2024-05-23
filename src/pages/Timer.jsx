import { useEffect, useState } from "react";

export default function Timer() {
    let [hour, setHour] = useState(0);
    let [minute, setMinute] = useState(0);
    let [second, setSecond] = useState(0);
    let [timerStarted, setTimerStarted] = useState(false);
    let [timeUp, setTimeUp] = useState(false);
    const stoppageTime = 2;

    useEffect(() => {
        if (hour < 10) setHour(`0${parseInt(hour)}`);
        if (minute < 10) setMinute(`0${parseInt(minute)}`);
        if (second < 10) setSecond(`0${parseInt(second)}`);
    }, [second]);

    useEffect(() => {
        let theTimeout;
        if (timerStarted) {
            theTimeout = setTimeout(() => {
            setSecond(parseInt(second) + 1);
            if (second == 9) {
                setSecond(0);
                setMinute(parseInt(minute) + 1);
                if (parseInt(minute) === 3 && parseInt(second) === 9) {
                    setMinute(0);
                    setHour(parseInt(hour) + 1)
                }
            }
            }, 1000);
        }
        if (hour === stoppageTime) {
            pauseTimer();
            resetTimer();
        }
        return () => {
            clearTimeout(theTimeout);
        }
    }, [second, timerStarted]);

    useEffect(() => {
        if (parseInt(hour) === stoppageTime) setTimeUp(true);
    }, [hour])

    const startTimer = () => {
        setSecond(parseInt(second) + 1);
        setTimerStarted(true);
        setTimeUp(false);
    }

    const resetTimer = () => {
        setTimerStarted(false);
        setTimeout(() => {
            setHour(0);
            setMinute(0);
            setSecond(0);
        }, 500);
        
    }

    const pauseTimer = () => {
        setTimerStarted(false);
        setHour(hour);
        setMinute(minute);
        setSecond(second);
    }
    
    return (
        <div className="d-flex gap-4 flex-column justify-content-center align-items-center mt-4">
            <h1>Stopwatch Timer</h1>
            <p className="fw-bold fs-1">
                {hour}:{minute}:{second}
            </p>
            <div className="d-flex gap-2">
                <button 
                    className="btn btn-primary" 
                    onClick={resetTimer}>Reset
                </button>
                <button 
                    className="btn btn-primary" 
                    onClick={pauseTimer}>Pause
                </button>
                <button 
                    className="btn btn-primary" 
                    disabled={timerStarted}
                    onClick={startTimer}>Start
                </button>
            </div>
            {timeUp && <div className="alert alert-danger">Time up!</div>}
        </div>
    );
}