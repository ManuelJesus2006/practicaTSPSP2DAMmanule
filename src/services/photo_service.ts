import { controlador } from "../controlador/controlador";

// Define la interfaz de tu servicio
interface PhotoService {
    getPhotosCategories(): Promise<Map<string, string>>; 
}

// Variables definidas localmente
const urlBase: string = 'https://api.pexels.com/v1/search?query=';

const pexelsHeaders: HeadersInit = {
    'Authorization': 'AyPJt9hHWD3nzOuj7UOyt74MSuQm5PQnJxSNODyeMs9qMpYl9joWStm3'
};

export const photoService: PhotoService = {
    // 1. Función ASÍNCRONA que devuelve una PROMESA del Map
    async getPhotosCategories(): Promise<Map<string, string>> {
        let uniqueCategories: string[] = controlador.getCategoriasUnicas();
        let mapPhotoCategory = new Map<string, string>();

        // Creamos un array de Promesas, una por cada fetch
        const fetchPromises = uniqueCategories.map(async (category) => {
            const url = `${urlBase}${category}`;

            try {
                // await para esperar la respuesta de la red
                const response = await fetch(url, { method: 'GET', headers: pexelsHeaders });
                
                if (!response.ok) {
                    throw new Error(`Ha ocurrido un error: ${response.status}`);
                }
                
                // await para esperar el cuerpo del JSON
                const data = await response.json(); 

                if (data.photos && data.photos.length > 0) {
                    // Llenamos el Map
                    mapPhotoCategory.set(category, data.photos[1].src.original); //Aquí elegimos una foto en concreto de las
                                                                                //que hay por categoria
                }

            } catch (error) {
                console.error(`Error al obtener foto para ${category}:`, error);
            }
        });

        // Esperar a que todas las Promesas se cumplan
        await Promise.all(fetchPromises);

        return mapPhotoCategory;
    }
}