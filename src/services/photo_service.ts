// Asumo que el controlador se ha renombrado a 'controller'
import { controller } from "../controlador/controlador";

// Define la interfaz de tu servicio: PhotoService
interface PhotoService {
    // Método traducido: getPhotosCategories
    getCategoryPhotos(): Promise<Map<string, string>>;
}

// Variables definidas localmente: urlBase -> baseUrl, pexelsHeaders (se mantiene)
const baseUrl: string = 'https://api.pexels.com/v1/search?query=';

const pexelsHeaders: HeadersInit = {
    'Authorization': 'AyPJt9hHWD3nzOuj7UOyt74MSuQm5PQnJxSNODyeMs9qMpYl9joWStm3'
};

export const photoService: PhotoService = {
    // 1. Función ASÍNCRONA que devuelve una PROMESA del Map
    async getCategoryPhotos(): Promise<Map<string, string>> {
        // Uso del controlador y método traducido
        let uniqueCategories: string[] = controller.getUniqueCategories();
        // Variable traducida: mapPhotoCategory -> categoryPhotoMap
        let categoryPhotoMap = new Map<string, string>();

        // Creamos un array de Promesas, una por cada fetch
        const fetchPromises = uniqueCategories.map(async (category) => {
            const url = `${baseUrl}${category}`;

            try {
                // await para esperar la respuesta de la red
                const response = await fetch(url, { method: 'GET', headers: pexelsHeaders });

                if (!response.ok) {
                    throw new Error(`An error occurred: ${response.status}`);
                }

                // await para esperar el cuerpo del JSON
                const data = await response.json();

                if (data.photos && data.photos.length > 0) {
                    // Llenamos el Map traducido
                    categoryPhotoMap.set(category, data.photos[1].src.original); //Aquí elegimos una foto en concreto de las
                    //que hay por categoria
                }

            } catch (error) {
                console.error(`Error fetching photo for ${category}:`, error);
            }
        });

        // Esperar a que todas las Promesas se cumplan
        await Promise.all(fetchPromises);

        return categoryPhotoMap;
    }
}