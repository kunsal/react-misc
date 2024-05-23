import { useEffect, useState } from "react";

export default function Question() {
    const [formData, setFormData] = useState({
        question: '',
        isTrueOrFalse: false,
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: ''
    });

    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        console.log(value);
        setFormData({...formData, [name]: value});
    }

    function handleSwitchChange(e) {
        setFormData({...formData, [e.target.name]: e.target.checked})
    }

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    function handleSubmit() {

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

            <div className="form-group">
                <label htmlFor="option3" className="control-label">Option 3</label>
                <input type="text" id="option3" name="option3" className="form-control" value={formData.option3} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
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