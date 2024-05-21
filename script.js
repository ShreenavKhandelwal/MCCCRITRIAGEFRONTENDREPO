document.addEventListener("DOMContentLoaded", function() {
    // Get the caseNumber from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const caseNumber = urlParams.get("caseNumber");
    const incidentId = urlParams.get("incidentId");

    if (caseNumber) {
        $('#criId .card-text').text(caseNumber);

        // Make a GET request to the API
        fetch(`https://critriageapp.azurewebsites.net/AutoTriageApi/GetTriageDataFromStore?caseNumber=${caseNumber}`)
            .then(response => response.json())
            .then(data => {
                // Handle the API response data
                console.log(data);
                // Do something with the data
                displayData(data);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error(error);
            });

    } 
    else if (incidentId) {
        
        $('#criId .card-header').text("Incident ID");
        $('#criId .card-text').text(incidentId);

        // Make a GET request to the API
        fetch(`https://critriageapp.azurewebsites.net/AutoTriageApi/GetTriageDataFromStore?incidentId=${incidentId}`)
        .then(response => response.json())
        .then(data => {
            // Handle the API response data
            console.log(data);
            // Do something with the data
            displayData(data);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error(error);
        });
    }
});


function displayData(data) {
    const container = document.getElementById('data-container'); // Assuming you have a div with id 'data-container' in your HTML

    // Convert the JSON object to a string and format it with 2-space indentation
    const formattedData = JSON.stringify(data, null, 2);

    // Display the formatted data in a <pre> tag to preserve the formatting
    container.innerHTML = `<pre>${formattedData}</pre>`;
}