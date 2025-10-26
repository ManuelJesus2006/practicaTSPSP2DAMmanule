import type { Pregunta } from '../models/trivia'
import { photoService } from '../services/photo_service'
import { preguntasService } from '../services/pregunta_service'

export interface Controlador {
    preguntas: Pregunta[],
    fotosCategorias: Map<string, string>
    getTodosDatos: () => Promise<void>
    getCategoriasUnicas: () => string[]
}
export const controlador: Controlador = {
    preguntas: [],
    fotosCategorias: new Map<string, string>(),
    async getTodosDatos() {
        try {
            const dataTriviaApi:Pregunta[] = await preguntasService.getPreguntas();
            this.preguntas = dataTriviaApi;
            const dataPhotoApi:Map<string, string> = await photoService.getPhotosCategories();
            this.fotosCategorias = dataPhotoApi;
        } catch (error) {
            console.log(`Ha ocurrido un error al recibir los datos: ${error}`)
        }
    },
    getCategoriasUnicas() {
        let categoriasUnicas:string[] = [];
        this.preguntas.forEach((pregunta) => {
            if (!categoriasUnicas.includes(pregunta.category.toLowerCase())) categoriasUnicas.push(pregunta.category.toLowerCase());
        })
        return categoriasUnicas;
    },
}

