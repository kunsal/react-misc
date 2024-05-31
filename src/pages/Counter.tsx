import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByValue } from "../store/slices/counter-slice";

interface CounterStateType {
    counter: {
        value: number
    }
}

export default function() {
    const counter = useSelector((state: CounterStateType) => state.counter.value)
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<number>(0);

    return (
    <div className="d-flex gap-4 flex-column justify-content-center align-items-center mt-4">
        <h1>Counter</h1>
        <p className="fw-bold fs-1">
            {counter}
        </p>
        <div className="d-flex gap-2">
            <button 
                className="btn btn-primary" 
                onClick={() => dispatch(decrement())}>Decrement
            </button>
            <button 
                className="btn btn-primary" 
                onClick={() => dispatch(increment())}>Increment
            </button>
            <button 
                className="btn btn-primary" 
                onClick={() => dispatch(incrementByValue(inputValue))}>Increment By Value
            </button>
        </div>
        <input type="number" value={inputValue} className="w-25 form-control align-self-center" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(parseInt(e.target.value));
        }} />
    </div>
    )
}