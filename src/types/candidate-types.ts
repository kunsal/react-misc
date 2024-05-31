export type Candidate = {
    name: string,
    email: string,
    skills: string[]
}

export type Candidates = {
    candidates: {
        data: Array<Candidate>
    }
}