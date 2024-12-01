document.addEventListener('DOMContentLoaded', () => {
    // Supón que estamos editando una encuesta específica, obtenemos el ID de la URL o de una lista
    const surveyId = getSurveyIdFromUrl();  // Función que obtiene el ID de la encuesta desde la URL o localStorage

    // Cargar los datos de la encuesta (en este ejemplo, simulamos datos)
    const surveyData = loadSurveyData(surveyId);  // Esta función debería hacer la petición real para cargar los datos de la encuesta

    // Cargar los datos en el formulario
    populateForm(surveyData);

    // Manejo de preguntas y respuestas
    const addQuestionBtn = document.getElementById('add-edit-question-btn');
    addQuestionBtn.addEventListener('click', addQuestion);

    // Guardar los cambios
    const editSurveyForm = document.getElementById('edit-survey-form');
    editSurveyForm.addEventListener('submit', handleSubmit);

    // Función para obtener el ID de la encuesta desde la URL
    function getSurveyIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');  // Asumiendo que la URL tiene el formato ...?id=123
    }

    // Simulación de carga de datos de la encuesta (esto debe venir de una base de datos o API)
    function loadSurveyData(id) {
        // Datos simulados (reemplazar con la llamada real a tu base de datos)
        const surveys = [
            {
                id: '1',
                name: 'Encuesta de Satisfacción',
                type: 'Pública',
                questions: [
                    { text: '¿Cómo calificarías nuestro servicio?', options: ['Excelente', 'Bueno', 'Regular'] },
                    { text: '¿Recomendarías nuestra empresa?', options: ['Sí', 'No'] }
                ]
            },
            {
                id: '2',
                name: 'Encuesta de Opinión',
                type: 'Privada',
                questions: [
                    { text: '¿Qué mejorarías en el producto?', options: ['Precio', 'Calidad', 'Variedad'] }
                ]
            }
        ];

        return surveys.find(survey => survey.id === id);
    }

    // Función para llenar el formulario con los datos de la encuesta
    function populateForm(surveyData) {
        if (!surveyData) return;

        const nameInput = document.getElementById('edit-survey-name');
        const typeSelect = document.getElementById('edit-survey-type');
        
        nameInput.value = surveyData.name;
        typeSelect.value = surveyData.type;

        const questionsContainer = document.getElementById('edit-questions-container');
        surveyData.questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.id = `edit-question-${index + 1}`;
            questionDiv.innerHTML = `
                <label for="question-${index + 1}-text">Pregunta ${index + 1}:</label>
                <input type="text" id="question-${index + 1}-text" name="question-${index + 1}-text" value="${question.text}" required>

                <label>Opciones de respuesta:</label>
                ${question.options.map((option, optionIndex) => `
                    <div>
                        <input type="checkbox" name="option-${index + 1}-${optionIndex}" value="${option}" checked> ${option}
                    </div>
                `).join('')}
            `;
            questionsContainer.appendChild(questionDiv);
        });
    }

    // Función para agregar una nueva pregunta
    function addQuestion() {
        const container = document.getElementById('edit-questions-container');
        const questionCount = container.children.length + 1;
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.id = `edit-question-${questionCount}`;
        questionDiv.innerHTML = `
            <label for="question-${questionCount}-text">Pregunta ${questionCount}:</label>
            <input type="text" id="question-${questionCount}-text" name="question-${questionCount}-text" required>
            
            <label>Opciones de respuesta:</label>
            <div>
                <input type="checkbox" name="option-${questionCount}" value="Opción 1"> Opción 1
            </div>
            <div>
                <input type="checkbox" name="option-${questionCount}" value="Opción 2"> Opción 2
            </div>
            <div>
                <input type="checkbox" name="option-${questionCount}" value="Opción 3"> Opción 3
            </div>
        `;
        container.appendChild(questionDiv);
    }

    // Función para manejar el envío del formulario y guardar los cambios
    function handleSubmit(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const updatedSurvey = {
            name: document.getElementById('edit-survey-name').value,
            type: document.getElementById('edit-survey-type').value,
            questions: []
        };

        // Obtener las preguntas y respuestas editadas
        const questions = document.querySelectorAll('.question');
        questions.forEach((questionDiv, index) => {
            const questionText = questionDiv.querySelector(`#question-${index + 1}-text`).value;
            const options = Array.from(questionDiv.querySelectorAll('input[type="checkbox"]:checked'))
                .map(option => option.value);

            updatedSurvey.questions.push({
                text: questionText,
                options: options
            });
        });

        // Guardar la encuesta editada (en este caso simulamos un almacenamiento)
        saveEditedSurvey(updatedSurvey);

        alert('Encuesta editada con éxito!');
    }

    // Función para guardar la encuesta editada (aquí se simula un proceso de guardado)
    function saveEditedSurvey(updatedSurvey) {
        console.log('Encuesta guardada:', updatedSurvey);
        // Aquí deberías hacer la petición a tu API o base de datos para guardar los cambios
    }
});
