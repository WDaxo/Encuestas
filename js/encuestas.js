document.addEventListener('DOMContentLoaded', () => {
    // Lógica para cargar las encuestas
    const tableBody = document.querySelector('#survey-table tbody');
    
    // Simulación de datos
    const surveys = [
        {name: 'Encuesta 1', type: 'Pública'},
        {name: 'Encuesta 2', type: 'Privada'}
    ];

    surveys.forEach(survey => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${survey.name}</td>
            <td>${survey.type}</td>
            <td><button class="button">Editar</button></td>
        `;
        tableBody.appendChild(row);
    });
});
