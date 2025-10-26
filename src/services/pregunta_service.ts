import { Convert, type Pregunta, type PreguntaResponse } from "../models/trivia";

let urlBase: string = 'https://opentdb.com/api.php?amount=50';

export interface PreguntaService {
    getPreguntas: () => Promise<Pregunta[]>;
}

export const preguntasService: PreguntaService = {
    async getPreguntas(): Promise<Pregunta[]> {
        try {
            const response = await fetch(urlBase);
            
            if (!response.ok) {
                throw new Error(`La petición no se ha podido realizar: ${response.status}`);
            }
            
            const jsonText = await response.text();
            const data: PreguntaResponse = Convert.toPreguntaResponse(jsonText);
            return data.preguntas; 

        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
            return [];
        }
    }
}
