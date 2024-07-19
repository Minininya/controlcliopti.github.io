document.getElementById('follow-up-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const customerName = document.getElementById('customer-name').value;
    const contactMethod = document.getElementById('contact-method').value;
    const question1 = document.getElementById('question1').value;
    const question2 = document.getElementById('question2').value;
    const question3 = document.getElementById('question3').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const description = document.getElementById('description').value;

    const record = {
        name: customerName,
        method: contactMethod,
        question1: question1,
        question2: question2,
        question3: question3,
        appointmentDate: appointmentDate,
        description: description,
        date: new Date().toLocaleString()
    };

    addRecord(record);
    clearForm();

    // Cuadro de confirmación
    alert('Registro agregado exitosamente.');
});

function addRecord(record) {
    const recordsList = document.getElementById('records');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${record.name}</strong> (${record.method}) - ${record.question1}, ${record.question2}, ${record.question3} - ${record.appointmentDate} - ${record.description} <br><small>${record.date}</small>`;
    recordsList.appendChild(listItem);

    // Save the record in local storage for persistence
    let records = JSON.parse(localStorage.getItem('records')) || [];
    records.push(record);
    localStorage.setItem('records', JSON.stringify(records));
}

function clearForm() {
    document.getElementById('follow-up-form').reset();
}

document.getElementById('export-btn').addEventListener('click', function() {
    const records = JSON.parse(localStorage.getItem('records')) || [];

    if (records.length === 0) {
        alert('No hay registros para exportar.');
        return;
    }

    // Debug: Verify records content
    console.log('Records to export:', records);

    // Convert JSON data to worksheet
    const ws = XLSX.utils.json_to_sheet(records);

    // Debug: Verify worksheet content
    console.log('Worksheet:', ws);
    
    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Seguimiento');

    // Debug: Verify workbook content
    console.log('Workbook:', wb);

    // Export the workbook to Excel file
    XLSX.writeFile(wb, 'seguimiento_atencion_cliente.xlsx');
});
