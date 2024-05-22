import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByValue } from "../store/slices/counter-slice";


export default function() {
    const counter = useSelector(state => state.counter.value)
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(0);

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
        <input type="number" value={inputValue} onChange={(e) => {
            setInputValue(() => e.target.value);
        }} />
    </div>
    )
}