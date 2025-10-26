import { controller } from "./controlador/controlador";
import type { Question } from "./models/trivia"
import './css/style.css';
import notFoundImageUrl from './notfoundimage.jpg';

await controller.loadAllData();
console.log(controller.categoryPhotos);
console.log(controller.questions)



/*import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'*/

document.body.innerHTML = `
    <header>
        <h2>Welcome to trivia page web!</h2>
        <h4>Here you can see some questions that you might have not seen before :)</h4>
        <h4>NOTE: It is NOT possible to answer the questions, but you can see the possible answers</h4>
    </header>
    <nav>
        <ul>
            <li><button onclick="formSearchByDifficulty()">Search questions by difficulty</button></li>
            <li><button onclick="showAllQuestions()">See all questions available</button></li>
        </ul>
    </nav>
`

function showAllQuestions(){
    //Vaciamos el documento
    document.body.innerHTML = '';
    //Título de la dificultad seleccionada
    let h2 = document.createElement('h2');
    h2.textContent = `Questions available`;
    document.body.appendChild(h2);
    
    //Bucle para montar el html de las preguntas
    controller.questions.forEach((question) => {
        //Elemento de bloque para que los datos estén ordenados
        let div = document.createElement('div');
        div.className = 'question';
        let photoQuestion = document.createElement('img')
        // La variable puede ser undefined
        let photoUrl = controller.categoryPhotos.get(question.category.toLowerCase());

        if (photoUrl) {
            // Si la URL existe, la asigna al atributo src elemento photoQuestion
            photoQuestion.src = photoUrl;
        } else {
            // Si no existe, muestra el error y asigna una url de respaldo
            console.error(`URL no encontrada para la categoría: ${question.category}`);
            photoQuestion.src = notFoundImageUrl;
        }
        
        //Títulos e imagen
        let questionTitle = document.createElement('h3');
        questionTitle.textContent = question.question;
        let questionTitleDifficulty = document.createElement('h4');
        questionTitleDifficulty.textContent = `Difficulty: ${question.difficulty}`
        div.appendChild(photoQuestion);
        div.appendChild(questionTitleDifficulty)
        div.appendChild(questionTitle)
        
        //Mostramos las respuestas incorrectas de la misma forma que la correcta
        question.incorrect_answers.forEach((badAnswer) => {
            let posibleAnswer = document.createElement('h4');
            posibleAnswer.textContent = badAnswer;
            div.appendChild(posibleAnswer);
        })
        
        let posibleAnswer = document.createElement('h4');
        posibleAnswer.textContent = question.correct_answer;
        div.appendChild(posibleAnswer);
        document.body.appendChild(div);
    })
    
    //Botón de volver al menu principal
    let backButton = document.createElement('button');
    backButton.textContent = 'Back to main menu';
    backButton.onclick = reloadPage;
    document.body.appendChild(backButton);
}

function formSearchByDifficulty() {
    let difficulties: String[] = [];
    //Vaciamos el documento
    document.body.innerHTML = '';
    
    let h2TituloForm = document.createElement('h2');
    h2TituloForm.textContent = 'Choose the difficulty of the question'
    document.body.appendChild(h2TituloForm);
    
    let form = document.createElement('form');
    document.body.appendChild(form);
    
    let select = document.createElement('select');
    controller.questions.forEach((question) => {
        console.log(question.difficulty);
        if (!difficulties.includes(question.difficulty.toLowerCase())) difficulties.push(question.difficulty.toLowerCase());
    })
    
    let options = '';
    difficulties.forEach((diff) => {
        options += `<option>${diff}</option>`
    })
    
    select.innerHTML = options
    
    let buttonSubmit = document.createElement('button');
    buttonSubmit.type = 'submit';
    buttonSubmit.textContent = 'Search';
    
    form.appendChild(select);
    form.appendChild(buttonSubmit);
    
    //Event listener para que espere a que el usuario seleccione un valor
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        showQuestionsByDifficulty(select.value);
    })
}

function showQuestionsByDifficulty(difficulty: String) {
    //Vaciamos el documento
    document.body.innerHTML = '';
    let questionsDifficulty: Question[] = [];
    //Título de la dificultad seleccionada
    let h2 = document.createElement('h2');
    h2.textContent = `Questions found for difficulty '${difficulty}'`;
    document.body.appendChild(h2);
    
    //Buscamos las preguntas por la dificultad elegida por el usuario
    controller.questions.forEach((question) => {
        if (question.difficulty.toLowerCase() == difficulty.toLowerCase()) questionsDifficulty.push(question as Question)
    })
    
    //Bucle para montar el html de las preguntas
    questionsDifficulty.forEach((question) => {
        //Elemento de bloque para que los datos estén ordenados
        let div = document.createElement('div');
        div.className = 'question';
        let photoQuestion = document.createElement('img')
        // La variable puede ser undefined
        let photoUrl = controller.categoryPhotos.get(question.category.toLowerCase());

        if (photoUrl) {
            // Si la URL existe, la asigna al atributo src elemento photoQuestion
            photoQuestion.src = photoUrl;
        } else {
            // Si no existe, muestra el error y asigna una url de respaldo
            console.error(`URL no encontrada para la categoría: ${question.category}`);
            photoQuestion.src = notFoundImageUrl;
        }
        
        //Títulos e imagen
        let questionTitle = document.createElement('h3');
        questionTitle.textContent = question.question;
        div.appendChild(photoQuestion);
        div.appendChild(questionTitle);
        
        //Mostramos las respuestas incorrectas de la misma forma que la correcta
        question.incorrect_answers.forEach((badAnswer) => {
            let posibleAnswer = document.createElement('h4');
            posibleAnswer.textContent = badAnswer;
            div.appendChild(posibleAnswer);
        })
        
        let posibleAnswer = document.createElement('h4');
        posibleAnswer.textContent = question.correct_answer;
        div.appendChild(posibleAnswer);
        document.body.appendChild(div);
    })
    
    //Botón de volver al menu principal
    let backButton = document.createElement('button');
    backButton.textContent = 'Back to main menu';
    backButton.onclick = reloadPage;
    document.body.appendChild(backButton);
}

function reloadPage(){
    window.location.reload();
}

//Declaraciones de ts para referenciar las funciones js
(window as any).formSearchByDifficulty = formSearchByDifficulty;
(window as any).showQuestionsByDifficulty = showQuestionsByDifficulty;
(window as any).showAllQuestions = showAllQuestions;

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)