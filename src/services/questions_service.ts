
import { Converter, type Question, type QuestionResponse } from "../models/trivia";

let baseUrl: string = 'https://opentdb.com/api.php?amount=50';

export interface QuestionService {
    getQuestions: () => Promise<Question[]>;
}

export const questionService: QuestionService = {
    async getQuestions(): Promise<Question[]> {
        try {
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error(`The request could not be completed: ${response.status}`);
            }

            const jsonText = await response.text();
            const data: QuestionResponse = Converter.toQuestionResponse(jsonText);

            return data.questions;

        } catch (error) {
            console.log(`An error has occurred: ${error}`);
            return [];
        }
    }
}