import { useEffect, useState } from "react";
import ConceptualTable from "../components/ConceptualTable";

export default function Candidates() {
    const [candidates, setCandidates] = useState([]);
    const [allCandidates, setAllCandidates] = useState([]);
    const conceptualTableClasses = ['table-success', 'table-info', 'table-warning', 'table-primary'];

    useEffect(() => {
        const savedCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
        if (savedCandidates.length > 0) {
            setCandidates(savedCandidates);
            setAllCandidates(savedCandidates); // useful for searching
        }
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        if (value == '') {
            setCandidates(allCandidates);
        } else {
            const searchedCandidates = allCandidates.filter(candidates => candidates.email.includes(value))
            setCandidates(searchedCandidates);
        }
    }

    const getTableClassIndex = (idx) => {
        const classesLength = conceptualTableClasses.length;
        if (idx < classesLength) return idx; 
        while (idx >= classesLength) {
            idx = idx - classesLength;
        }
        return idx;
    }

    return (
        <div className="d-flex flex-column mt-4 align-items-center justify-content-center">
            <div className="d-flex gap-2 align-self-end align-items-center">
                <label>Search:</label>
                <input type="text" name="search" onChange={handleSearch}/>
            </div>
            <ConceptualTable data={candidates} theadColumns={['Name', 'Email', 'Skills']} tbodyKeys={['name', 'email', 'skills']} />
            {/* <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Skills</th>
                    </tr>
                </thead>
                <tbody> 
                {candidates.length > 0 && 
                   candidates.map((candidate, idx) => (
                        <tr key={candidate.email} className={conceptualTableClasses[getTableClassIndex(idx)]}>
                            <td>{candidate.name}</td>
                            <td>{candidate.email}</td>
                            <td>{JSON.stringify(candidate.skills)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table> */}
        </div>
    );
}