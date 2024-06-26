import React, { useEffect, useState } from "react";
import ConceptualTable from "../components/ConceptualTable";
import { useSelector } from "react-redux";
import { Candidate, Candidates as CandidatesType } from "../types/candidate-types";

export default function Candidates() {
    const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
    const candidates = useSelector((state: CandidatesType) => state.candidates.data);

    useEffect(() => {
        setFilteredCandidates(candidates); // useful for searching
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value == '') {
            setFilteredCandidates(candidates);
        } else {
            const searchedCandidates = candidates.filter(candidates => candidates.email.startsWith(value))
            setFilteredCandidates(searchedCandidates);
        }
    }


    return (
        <div className="d-flex flex-column mt-4 align-items-center justify-content-center">
            <div className="d-flex gap-2 align-self-end align-items-center">
                <label>Search:</label>
                <input type="text" name="search" className="form-control" onChange={handleSearch}/>
            </div>
            <ConceptualTable data={filteredCandidates} theadColumns={['Name', 'Email', 'Skills']} tbodyKeys={['name', 'email', 'skills']} />
        </div>
    );
}