export interface OptionsType {
    option: string,
    value: string
}

export interface QuestionFormType {
    question: string,
    isTrueOrFalse: boolean,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    answer: string
}

export interface IQuestion {
    question: string, 
    answer: string, 
    isTrueOrFalse: boolean, 
    options: OptionsType[]
}