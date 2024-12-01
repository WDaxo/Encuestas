let surveys = JSON.parse(localStorage.getItem('surveys')) || [];  // Cargar encuestas desde almacenamiento local

// Función para agregar una pregunta
function addQuestion() {
    const questionsList = document.getElementById('questions-list');
    const questionNumber = questionsList.children.length + 1;

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    
    questionDiv.innerHTML = `
        <label for="question-${questionNumber}">Pregunta ${questionNumber}:</label>
        <input type="text" id="question-${questionNumber}" name="question-${questionNumber}" required>
        
        <div class="options-container">
            <label>Opciones de respuesta:</label>
            <div>
                <input type="checkbox" name="option-${questionNumber}" value="Opción 1"> Opción 1
            </div>
            <div>
                <input type="checkbox" name="option-${questionNumber}" value="Opción 2"> Opción 2
            </div>
            <div>
                <input type="checkbox" name="option-${questionNumber}" value="Opción 3"> Opción 3
            </div>
        </div>
        <button type="button" onclick="removeQuestion(this)">Eliminar Pregunta</button>
    `;
    
    questionsList.appendChild(questionDiv);
}

// Función para eliminar una pregunta
function removeQuestion(button) {
    button.parentElement.remove();
}

// Función para renderizar las encuestas en la tabla
function renderSurveys() {
    const surveyTableBody = document.getElementById('survey-table-body');
    surveyTableBody.innerHTML = '';

    surveys.forEach((survey, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${survey.name}</td>
            <td>${survey.age}</td>
            <td>
                <button onclick="editSurvey(${index})">Editar</button>
                <button onclick="deleteSurvey(${index})">Eliminar</button>
            </td>
        `;
        
        surveyTableBody.appendChild(row);
    });
}

// Función para agregar o actualizar una encuesta
document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('survey-type').value;

    if (!name || !age) {
        showAlertModal(); // Mostrar modal si faltan datos
        return;
    }

    const questions = [];
    const questionElements = document.querySelectorAll('.question');

    questionElements.forEach(questionDiv => {
        const questionText = questionDiv.querySelector('input[type="text"]').value;
        const options = [];
        const optionElements = questionDiv.querySelectorAll('input[type="checkbox"]:checked');

        optionElements.forEach(option => {
            options.push(option.value);
        });

        if (questionText && options.length > 0) {
            questions.push({ question: questionText, options: options });
        }
    });

    if (questions.length === 0) {
        showAlertModal(); // Mostrar modal si no se agregaron preguntas
        return;
    }

    // Crear nueva encuesta o actualizar existente
    const surveyIndex = localStorage.getItem('surveyIndex');
    if (surveyIndex !== null) {
        surveys[surveyIndex] = { name, age, questions };
    } else {
        surveys.push({ name, age, questions });
    }

    localStorage.setItem('surveys', JSON.stringify(surveys));
    document.getElementById('survey-form').reset();
    renderSurveys();
});

// Función para editar una encuesta
function editSurvey(index) {
    localStorage.setItem('surveyIndex', index);  // Guardar índice en almacenamiento local
    window.location.href = 'edit.html';          // Redirigir a la página de edición
}

// Función para eliminar una encuesta
function deleteSurvey(index) {
    surveys.splice(index, 1);
    localStorage.setItem('surveys', JSON.stringify(surveys));
    renderSurveys();
}

// Función para mostrar el modal de alerta
function showAlertModal() {
    document.getElementById('alert-modal').style.display = 'flex';
}

// Función para cerrar el modal de alerta
function closeAlertModal() {
    document.getElementById('alert-modal').style.display = 'none';
}

// Render inicial de las encuestas guardadas
renderSurveys();
