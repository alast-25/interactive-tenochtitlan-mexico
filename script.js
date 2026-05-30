// Lógica de Pestañas (Tabs)
function openTab(evt, sectionName) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(sectionName).classList.add('active');
    evt.currentTarget.classList.add('active');
    
    // Si entran a la trivia de nuevo y ya terminó, reiniciar
    if (sectionName === 'trivia' && currentQuestionIndex >= quizData.length) {
        reiniciarQuiz();
    }
}

// Banco de Preguntas Ampliado
const quizData = [
    {
        question: "¿En qué año se fundó formalmente México-Tenochtitlan?",
        options: ["1521", "1325", "1492", "1250"],
        correct: 1,
        explanation: "Tenochtitlan fue fundada en el año 1325 en un islote del Lago de Texcoco."
    },
    {
        question: "¿Como se llamaban los sistemas agrícolas flotantes que permitían cultivar sobre el lago?",
        options: ["Calpullis", "Terrazas", "Chinampas", "Milpas"],
        correct: 2,
        explanation: "Las chinampas eran ingeniosas islas artificiales hiperproductivas de cultivo."
    },
    {
        question: "¿A qué deidades estaba dedicado el Templo Mayor en sus adoratorios gemelos?",
        options: ["Quetzalcóatl y Tezcatlipoca", "Tláloc y Huitzilopochtli", "Tonatiuh y Coatlicue", "Xipe Tótec y Mictlantecuhtli"],
        correct: 1,
        explanation: "El Templo Mayor honraba simultáneamente a Tláloc (lluvia/agricultura) y Huitzilopochtli (guerra/sol)."
    },
    {
        question: "¿Qué escuela estaba destinada principalmente a la educación militar de la gente común (Macehualtin)?",
        options: ["Calmécac", "Teocalli", "Telpochcalli", "Cuicacalli"],
        correct: 2,
        explanation: "El Telpochcalli educaba a los jóvenes del pueblo para la guerra, mientras el Calmécac era para los nobles."
    },
    {
        question: "¿Quiénes eran los Pochtecas en la sociedad mexica?",
        options: ["Los sacerdotes encargados de los sacrificios", "Los comerciantes que también actuaban como espías", "Los guerreros de élite águila", "Los constructores de los acueductos"],
        correct: 1,
        explanation: "Los Pochtecas comerciaban productos lujosos a largas distancias y daban valiosa información estratégica al Tlatoani."
    },
    {
        question: "¿Cómo se llamaba la gran obra de ingeniería hidráulica diseñada para separar las aguas dulces de las saladas?",
        options: ["El Acueducto de Chapultepec", "La Calzada de Iztapalapa", "El Albarradón de Nezahualcóyotl", "El Canal de la Viga"],
        correct: 2,
        explanation: "El Albarradón de Nezahualcóyotl fue un muro/dique gigante que controlaba las inundaciones y la salinidad."
    },
    {
        question: "¿Qué emperador (Huey Tlatoani) gobernaba Tenochtitlan cuando llegaron los españoles en 1519?",
        options: ["Cuauhtémoc", "Cuitláhuac", "Moctezuma Xocoyotzin", "Itzcóatl"],
        correct: 2,
        explanation: "Moctezuma II (Xocoyotzin) recibió a Cortés. Tras su muerte gobernó Cuitláhuac y finalmente Cuauhtémoc."
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showResults();
        return;
    }

    const currentQuestion = quizData[currentQuestionIndex];
    
    // Actualizar interfaz
    document.getElementById('question-number').innerText = `PREGUNTA ${currentQuestionIndex + 1} DE ${quizData.length}`;
    document.getElementById('question-text').innerText = currentQuestion.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    const feedbackBox = document.getElementById('feedback-box');
    feedbackBox.style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';

    // Renderizar botones de opción
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.onclick = () => checkAnswer(index, button);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex, clickedButton) {
    const currentQuestion = quizData[currentQuestionIndex];
    const feedbackBox = document.getElementById('feedback-box');
    const buttons = document.querySelectorAll('.option-btn');
    
    // Deshabilitar todos los botones para que no cambien la respuesta
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuestion.correct) {
        score++;
        feedbackBox.className = "correct-ans";
        feedbackBox.innerHTML = `<strong>¡Correcto!</strong> ${currentQuestion.explanation}`;
        clickedButton.style.borderColor = "green";
        clickedButton.style.backgroundColor = "#e2f0d9";
    } else {
        feedbackBox.className = "incorrect-ans";
        feedbackBox.innerHTML = `<strong>Incorrecto.</strong> La respuesta correcta es "${currentQuestion.options[currentQuestion.correct]}".<br><small>${currentQuestion.explanation}</small>`;
        clickedButton.style.borderColor = "var(--rojo-sangre)";
        clickedButton.style.backgroundColor = "#fbe5e6";
    }

    feedbackBox.style.display = 'block';
    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    const quizBox = document.getElementById('quiz-box');
    let rango = "";
    
    if(score === quizData.length) rango = "¡Un verdadero Huey Tlatoani del conocimiento! 👑";
    else if(score >= 5) rango = "¡Guerrero Águila destacado! 🦅";
    else if(score >= 3) rango = "Un buen Macehual (ciudadano promedio). Puedes mejorar. 🌾";
    else rango = "Prisionero de la ignorancia. ¡Te hace falta estudiar las crónicas! 🏹";

    quizBox.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <h3 style="font-size: 2rem; color: var(--rojo-sangre); margin-bottom: 1rem;">¡Trivia Terminada!</h3>
            <p style="font-size: 1.3rem; margin-bottom: 0.5rem;">Tu puntuación: <strong>${score} / ${quizData.length}</strong> aciertos.</p>
            <p style="font-size: 1.1rem; font-style: italic; color: #555; margin-bottom: 2rem;">Rango: ${rango}</p>
            <button class="btn-primario" onclick="reiniciarQuiz()">Volver a intentar</button>
        </div>
    `;
}

function reiniciarQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    
    // Reestablecer la estructura original del contenedor de trivia
    const quizBox = document.getElementById('quiz-box');
    quizBox.innerHTML = `
        <div id="quiz-header">
            <h3 id="question-number" style="color: var(--turquesa); font-size: 1rem; margin-bottom: 0.5rem;"></h3>
            <h3 id="question-text">Cargando pregunta...</h3>
        </div>
        <div id="options-container"></div>
        <div id="feedback-box" style="display: none;"></div>
        <button id="next-btn" class="btn-primario" style="display: none;" onclick="nextQuestion()">Siguiente Pregunta</button>
    `;
    loadQuestion();
}

// Iniciar la trivia la primera vez que carga el script
window.onload = loadQuestion;