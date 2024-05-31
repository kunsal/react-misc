import { useEffect, useState } from "react";

type TimerProps = {
    stoppageTime?: number;
}

export default function Timer({stoppageTime = 2}: TimerProps) {
    let [hour, setHour] = useState<number | string>(0);
    let [minute, setMinute] = useState<number | string>(0);
    let [second, setSecond] = useState<number | string>(0);
    let [timerStarted, setTimerStarted] = useState<boolean>(false);
    let [timeUp, setTimeUp] = useState<boolean>(false);

    useEffect(() => {
        if ((hour as number) < 10) setHour(`0${parseInt(hour as string)}`);
        if ((minute as number) < 10) setMinute(`0${parseInt(minute as string)}`);
        if ((second as number) < 10) setSecond(`0${parseInt(second as string)}`);
    }, [second]);

    useEffect(() => {
        let theTimeout: ReturnType<typeof setTimeout>;
        if (timerStarted) {
            theTimeout = setTimeout(() => {
            setSecond(parseInt(second as string) + 1);
            if (second == 9) {
                setSecond(0);
                setMinute(parseInt(minute as string) + 1);
                if (parseInt(minute as string) === 3 && parseInt((second as unknown) as string) === 9) {
                    setMinute(0);
                    setHour(parseInt(hour as string) + 1)
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
        if (parseInt(hour as string) === stoppageTime) setTimeUp(true);
    }, [hour])

    const startTimer = () => {
        setSecond(parseInt(second as string) + 1);
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
            <p className="fw-bold fs-1" aria-label="timer-display">
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