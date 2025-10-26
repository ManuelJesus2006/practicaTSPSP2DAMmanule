
import type { Question } from '../models/trivia'
import { photoService } from '../services/photo_service'
import { questionService } from '../services/questions_service'

export interface Controller {
    questions: Question[],
    categoryPhotos: Map<string, string>
    loadAllData: () => Promise<void>
    getUniqueCategories: () => string[]
}

// Objeto traducido: controlador -> controller
export const controller: Controller = {
    questions: [],
    categoryPhotos: new Map<string, string>(),

    async loadAllData() {
        try {
            const triviaData: Question[] = await questionService.getQuestions();
            this.questions = triviaData;

            const photoData: Map<string, string> = await photoService.getCategoryPhotos();
            this.categoryPhotos = photoData;

        } catch (error) {
            console.log(`An error occurred while receiving data: ${error}`)
        }
    },

    getUniqueCategories() {
        let uniqueCategories: string[] = [];

        this.questions.forEach((question) => {
            if (!uniqueCategories.includes(question.category.toLowerCase())) uniqueCategories.push(question.category.toLowerCase());
        })
        return uniqueCategories;
    },
}