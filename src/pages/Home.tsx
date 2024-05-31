import { MutableRefObject, useEffect, useRef, useState } from "react";
import { add } from "../store/slices/candidates-slice";
import { useDispatch, useSelector } from "react-redux";
import { Candidates as CandidatesType } from "../types/candidate-types";

type UserDataFormType = {
    name: string,
    email: string,
    skill: string,
    skills: string[]
}

const Home = () => {
    let [formData, setFormData] = useState<UserDataFormType>({
        name: '',
        email: '',
        skill: '',
        skills: []
    });
    const skillRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const candidates = useSelector((state: CandidatesType) => state.candidates.data);
    const dispatch = useDispatch();

    const addSkill = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (formData.skill == '') return;
        const skill = formData.skill;
        const skillExists = formData.skills.filter(s => s == skill);
        if (skillExists.length == 0) {
            const newFormData = {...formData, skills: [...formData.skills, skill]};
            setFormData(newFormData);
        }
        (skillRef as MutableRefObject<HTMLInputElement>).current.value = '';
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const {name, email, skills} = formData;
        const candidateExists = candidates.filter(c => c.email === email);
        if (candidateExists.length == 0) {
            const candidate = {name, email, skills}
            dispatch(add(candidate));
            //  (emailRef as MutableRefObject<HTMLInputElement>).current.value = '';
            setFormData({
                name: '',
                skill: '',
                email: '',
                skills: []
            });
        } 
    }

    const removeSkill = (e: React.MouseEvent<HTMLSpanElement>) => {
        const skill = (e.target as HTMLSpanElement).textContent;
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
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="" className="control-label">Email</label>
                    <input 
                        name="email"
                        ref={emailRef}
                        type="text" 
                        className="form-control" 
                        onChange={(e) => handleInputChange(e)}
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
                            onChange={(e) => handleInputChange(e)}
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