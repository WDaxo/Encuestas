document.addEventListener('DOMContentLoaded', () => {
    const addQuestionBtn = document.getElementById('add-question-btn');
    addQuestionBtn.addEventListener('click', addQuestion);

    function addQuestion() {
        const container = document.getElementById('questions-container');
        const questionCount = container.children.length + 1;
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.id = `question-${questionCount}`;
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
});
