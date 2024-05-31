import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../store/slices/questions-slice";
import { IQuestion, OptionsType, QuestionFormType } from "../types/question-types";
import axios, { AxiosError } from "axios";
import { createQuestion } from "../services/question-service";
import { ApiResponse } from "./Login";

export default function Question() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<QuestionFormType>({
        question: '',
        isTrueOrFalse: false,
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: ''
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({...formData, [ e.target.name]: e.target.value});
    }

    function handleSwitchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({...formData, [e.target.name]: e.target.checked})
    }

    useEffect(() => {
       
    }, [formData.isTrueOrFalse]);

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const {question, option1, option2, option3, option4, answer, isTrueOrFalse} = formData;
        if (question !== '' && option1 !== '' && option2 !== '' && answer !== '') {
            let options: Array<OptionsType> = [{option: 'option1', value: option1}, {option: 'option2', value: option2}];
            if (!isTrueOrFalse) {
                options.push({option: 'option3', value: option3});
                options.push({option: 'option4', value: option4});
            }
            const questionData: IQuestion = {
                question, answer, isTrueOrFalse, options
            }
            console.log(questionData);
        
            dispatch(addQuestion(questionData));
            try {
                const response = await createQuestion(formData);
                console.log(response);
            } catch (error) {
                console.log('Error occured', error);
                // console.log((((error as AxiosError).response?.data) as ApiResponse).message)
            }
            
            
            
            formData.isTrueOrFalse = false;
            formData.option1 = '';
            formData.option2 = '';
            formData.option4 = '';
            formData.question = '';
            formData.answer = '';
            options = [];
        }
    }

    return (
    <div className="d-flex gap-4 flex-column justify-content-center align-items-center mt-4">
        <h1>Add Question</h1>
        <form className="form d-flex flex-column gap-4">
            <div className="form-group">
                <label className="control-label">Question</label>
                <textarea className="form-control" name="question" onChange={handleInputChange} defaultValue={formData.question} />
            </div>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name="isTrueOrFalse" defaultChecked={formData.isTrueOrFalse} onChange={handleSwitchChange}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">True/False Option</label>
            </div>

            <div className="form-group">
                <label htmlFor="option1" className="control-label">Option 1</label>
                <input type="text" id="option1" name="option1" className="form-control" value={formData.option1} onChange={handleInputChange}/>
            </div>

            <div className="form-group">
                <label htmlFor="option2" className="control-label">Option 2</label>
                <input type="text" id="option2" name="option2" className="form-control" value={formData.option2} onChange={handleInputChange}/>
            </div>

            <div className="form-group" style={{display: formData.isTrueOrFalse ? 'none' : 'block' }}>
                <label htmlFor="option3" className="control-label">Option 3</label>
                <input type="text" id="option3" name="option3" className="form-control" value={formData.option3} onChange={handleInputChange}/>
            </div>
            <div className="form-group" style={{display: formData.isTrueOrFalse ? 'none' : 'block' }}>
                <label htmlFor="option4" className="control-label">Option 4</label>
                <input type="text" id="option4" name="option4" className="form-control" value={formData.option4} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="answer" className="control-label">Answer</label>
                <input type="text" id="answer" name="answer" className="form-control" value={formData.answer} onChange={handleInputChange} />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    </div>
    );
}