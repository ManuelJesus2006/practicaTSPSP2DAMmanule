// Asumo que el tipo 'Pregunta' se ha renombrado a 'Question' en '../models/trivia'
import type { Question } from '../models/trivia'
// Asumo que el servicio y el archivo se han renombrado
import { photoService } from '../services/photo_service'
import { questionService } from '../services/questions_service'

// Interfaz traducida: Controlador -> Controller
export interface Controller {
    // Propiedades traducidas: preguntas -> questions, fotosCategorias -> categoryPhotos
    questions: Question[],
    categoryPhotos: Map<string, string>
    // Métodos traducidos: getTodosDatos -> loadAllData, getCategoriasUnicas -> getUniqueCategories
    loadAllData: () => Promise<void>
    getUniqueCategories: () => string[]
}

// Objeto traducido: controlador -> controller
export const controller: Controller = {
    questions: [],
    categoryPhotos: new Map<string, string>(),

    async loadAllData() {
        try {
            // Uso de los tipos y métodos traducidos del servicio
            const triviaData: Question[] = await questionService.getQuestions();
            this.questions = triviaData;

            const photoData: Map<string, string> = await photoService.getCategoryPhotos();
            this.categoryPhotos = photoData;

        } catch (error) {
            // Mensaje de error traducido
            console.log(`An error occurred while receiving data: ${error}`)
        }
    },

    getUniqueCategories() {
        let uniqueCategories: string[] = [];

        // Iteración sobre la lista de preguntas traducida
        this.questions.forEach((question) => {
            if (!uniqueCategories.includes(question.category.toLowerCase())) uniqueCategories.push(question.category.toLowerCase());
        })
        return uniqueCategories;
    },
}