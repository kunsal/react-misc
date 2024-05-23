import { useEffect, useRef, useState } from "react";
import { add } from "../store/slices/candidates-slice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    let [formData, setFormData] = useState({
        name: '',
        email: '',
        skill: '',
        skills: []
    });
    const skillRef = useRef(null);
    const emailRef = useRef(null);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    // const [candidates, setCandidates] = useState(null);
    const candidates = useSelector(state => state.candidates.data);
    const dispatch = useDispatch();

    const addSkill = (e) => {
        e.preventDefault();
        if (formData.skill == '') return;
        const skill = formData.skill;
        const skillExists = formData.skills.filter(s => s == skill);
        if (skillExists.length == 0) {
            const newFormData = {...formData, skills: [...formData.skills, skill]};
            setFormData(newFormData);
        }
        skillRef.current.value = '';
    }

    const handleFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // const savedCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
        const {name, email, skills} = formData;
        const candidateExists = candidates.filter(c => c.email === email);
        if (candidateExists.length == 0) {
            const candidate = {name, email, skills}
            //setCandidates([...savedCandidates, candidate]);
            dispatch(add(candidate));
            emailRef.current.value = '';
            setFormData({
                name: '',
                skills: []
            });
        } 
    }

    const removeSkill = (e) => {
        const skill = e.target.textContent;
        const skills = formData.skills.filter(s => s != skill);
        setFormData({...formData, skills: skills});
    }

    useEffect(() => {
        if (formData.email != '' && formData.name != '' && formData.skills.length > 0) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    }, [formData]);

    // Run when the page reloads
    useEffect(() => {
        console.log(candidates);
        // console.log('Expected to run at component mount');
        // const savedCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
        // console.log(savedCandidates);
        // setCandidates(savedCandidates);
        // localStorage.setItem('candidates', JSON.stringify(savedCandidates));
    }, []);

    // useEffect(() => {
    //     if (candidates !== null) {
    //         dispatch(add(candidates));
    //         // localStorage.setItem('candidates', JSON.stringify(candidates));
    //     }
    // }, [candidates]);

    return (
        <div className="d-flex flex-column mt-4 align-items-center justify-content-center">
            <h1>Add Candidate</h1>
            <form className="form d-flex flex-column gap-4">
                <div className="form-group">
                    <label htmlFor="" className="control-label">Name</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        className="form-control" 
                        onChange={(e) => handleFormChange(e)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="" className="control-label">Email</label>
                    <input 
                        name="email"
                        ref={emailRef}
                        type="text" 
                        className="form-control" 
                        onChange={(e) => handleFormChange(e)}
                    />
                </div>
                <div className="d-flex gap-2">
                    <div className="form-group">
                        <label htmlFor="" className="control-label">Skill</label>
                        <input 
                            name="skill"
                            type="text" 
                            className="form-control" 
                            ref={skillRef}
                            onChange={(e) => handleFormChange(e)}
                        />
                    </div>
                    <button onClick={addSkill} className="btn btn-primary align-self-end">Add Skill</button>
                </div>

                {formData.skills.length > 0 &&
                    <div className="d-flex flex-wrap gap-1">
                        { formData.skills.map(skill => (
                            <span 
                                key={skill} 
                                className="badge text-bg-secondary cursor-pointer"
                                style={{cursor: 'pointer'}}
                                onClick={removeSkill}
                            >
                                    {skill}
                            </span>)) 
                        }
                    </div>
                }
                <button 
                    onClick={handleSubmit} 
                    className="btn btn-secondary align-self-start"
                    disabled={submitDisabled}
                >
                    Submit Form
                </button>
            </form>
        </div>
    );
}

export default Home;