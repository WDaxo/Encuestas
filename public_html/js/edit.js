let surveys = JSON.parse(localStorage.getItem('surveys')) || [];
let currentSurveyIndex = localStorage.getItem('surveyIndex');

// Verificar si la encuesta existe
if (currentSurveyIndex === null || !surveys[currentSurveyIndex]) {
    alert("Encuesta no encontrada");
    window.location.href = 'index.html'; // Redirigir si no se encuentra la encuesta
} else {
    let currentSurvey = surveys[currentSurveyIndex];

    // Función para cargar la encuesta a editar
    function loadSurveyToEdit() {
        document.getElementById('edit-name').value = currentSurvey.name;
        document.getElementById('edit-type').value = currentSurvey.type;

        const editQuestionsContainer = document.getElementById('edit-questions-container');
        currentSurvey.questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            
            questionDiv.innerHTML = `
                <label for="edit-question-${index + 1}">Pregunta ${index + 1}:</label>
                <input type="text" id="edit-question-${index + 1}" value="${question.question}" required>
                
                <div class="options-container">
                    <label>Opciones de respuesta:</label>
                    ${question.options.map(option => `
                        <div>
                            <input type="checkbox" name="edit-option-${index + 1}" value="${option}" checked> ${option}
                        </div>
                    `).join('')}
                </div>
            `;
            
            editQuestionsContainer.appendChild(questionDiv);
        });
    }

    // Función para guardar los cambios realizados en la encuesta
    document.getElementById('edit-survey-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores editados
        const editedName = document.getElementById('edit-name').value;
        const editedType = document.getElementById('edit-type').value;

        // Obtener las preguntas editadas
        const editedQuestions = [];
        const questionElements = document.querySelectorAll('.question');
        
        questionElements.forEach((questionDiv, index) => {
            const questionText = questionDiv.querySelector('input[type="text"]').value;
            const options = [];
            const optionElements = questionDiv.querySelectorAll('input[type="checkbox"]:checked');
            
            optionElements.forEach(option => {
                options.push(option.value);
            });

            if (questionText && options.length > 0) {
                editedQuestions.push({ question: questionText, options: options });
            }
        });

        // Guardar la encuesta editada
        surveys[currentSurveyIndex] = { name: editedName, type: editedType, questions: editedQuestions };
        localStorage.setItem('surveys', JSON.stringify(surveys));

        // Redirigir al listado de encuestas
        window.location.href = 'index.html';
    });

    // Cargar la encuesta al abrir la página
    loadSurveyToEdit();
}

// Función para confirmar eliminación de encuesta
function confirmDeleteSurvey() {
    const modal = document.getElementById('delete-confirmation');
    modal.style.display = 'flex';
}

// Función para cerrar el modal de confirmación
function closeModal() {
    const modal = document.getElementById('delete-confirmation');
    modal.style.display = 'none';
}

// Función para eliminar la encuesta
function deleteSurvey() {
    surveys.splice(currentSurveyIndex, 1);
    localStorage.setItem('surveys', JSON.stringify(surveys));

    // Cerrar modal y redirigir a la página principal
    closeModal();
    window.location.href = 'index.html';
}
