import { useEffect, useState } from "react";
import ConceptualTable from "../components/ConceptualTable";
import { useSelector } from "react-redux";

export default function Candidates() {
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const candidates = useSelector(state => state.candidates.data);


    useEffect(() => {
        setFilteredCandidates(candidates); // useful for searching
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        if (value == '') {
            setFilteredCandidates(candidates);
        } else {
            const searchedCandidates = candidates.filter(candidates => candidates.email.includes(value))
            setFilteredCandidates(searchedCandidates);
        }
    }


    return (
        <div className="d-flex flex-column mt-4 align-items-center justify-content-center">
            <div className="d-flex gap-2 align-self-end align-items-center">
                <label>Search:</label>
                <input type="text" name="search" onChange={handleSearch}/>
            </div>
            <ConceptualTable data={filteredCandidates} theadColumns={['Name', 'Email', 'Skills']} tbodyKeys={['name', 'email', 'skills']} />
        </div>
    );
}