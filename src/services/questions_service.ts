// Asumo que 'Pregunta' y 'PreguntaResponse' se convierten a 'Question' y 'QuestionResponse'
// y que el módulo Convert ahora se llama 'Converter'.
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
            // Uso de los nombres traducidos en la conversión
            const data: QuestionResponse = Converter.toQuestionResponse(jsonText);

            // Asumo que el campo 'preguntas' dentro del objeto 'data' también se ha traducido a 'questions'
            return data.questions;

        } catch (error) {
            console.log(`An error has occurred: ${error}`);
            return [];
        }
    }
}