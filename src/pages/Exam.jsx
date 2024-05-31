import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Exam() {
    const questions = useSelector(state => state.questions.data);
    const [result, setResult] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [examCompleted, setExamCompleted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const realAnswers = questions.map(question => question.answer);
        let scores = 0;
        for (let i = 0; i < realAnswers.length; i++) {
            if (realAnswers[i] == answers[i]) {
                scores++;
            }
        }
        setExamCompleted(true);
        setResult(scores);
    }

    const handleOptionChange = (e) => {
        const questionIndex = e.target.name.split('-')[1];
        const answersCopy = [...answers];
        answersCopy.splice(questionIndex, 1, e.target.value);
        setAnswers(answersCopy);
    }
    
    return (
        <div className="d-flex flex-column mt-4 align-items-center justify-content-center">
            <h1>Examination</h1>
            {questions?.map((question, idx) =>  (<div key={question.question}>
                    <h3>{question.question}</h3>
                    {question?.options.map((option, i) => {
                        return (
                        <>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name={`question-${idx}`} value={option.option} onChange={handleOptionChange} key={`question-${idx + 1}`}/>
                                <label class="form-check-label">
                                    {option.value}
                                </label>
                            </div>
                        </>
                    )})}
                </div>)
            )}
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            <p style={{ display: examCompleted ? 'block' : 'none' }}>Thank you. You scored <strong>{result} out of {questions.length}</strong></p>
        </div>
    );
}


