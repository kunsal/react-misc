import authenticatedService from '../config/authenticated-service';
import { QuestionFormType } from '../types/question-types';

export const createQuestion = async (data: QuestionFormType) => {
    const response = await authenticatedService.post('cbt/questions', JSON.stringify(data));
    console.log(response);
}