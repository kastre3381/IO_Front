document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('addCarForm'); // Change to match your actual form ID (e.g., 'addRideForm')

    if (form) {
        // Get userId from localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('Brak zapamiętanego identyfikatora użytkownika.');
            return;
        }

        try {
            const userData = await fetchInfo(userId);
            form.addEventListener('submit', async (event) => {
                event.preventDefault();

                // Extract form data (adjust IDs as per your actual form)
                const carRegistrationNumber = document.getElementById('carRegistrationNumber').value;
                const carVinNumber = document.getElementById('carVinNumber').value;
                const firstRegistrationDate = formatDate(document.getElementById('firstRegistrationDate').value);

                // Construct payload with user data included
                const formData = {
                    registration: carRegistrationNumber,
                    vin: carVinNumber,
                    registration_date: firstRegistrationDate,
                    user: {
                        role: 'driver',
                        ...userData
                    }
                };
                try {
                    const response = await fetch('http://localhost:9000/car', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        const result = await response.json();
                        alert('Car added successfully! Your car ID is: ' + result._id);
                    } else {
                        const error = await response.json();
                        alert('Adding car failed: ' + (error.message || 'Unknown error'));
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while adding the car. Please try again later.');
                }
            });

        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('An error occurred while fetching user data.');
        }

    } else {
        console.error('Form element not found');
    }
});
function formatDate(dateString) {
    var parts = dateString.split('-');
    return parts[2] + '.' + parts[1] + '.' + parts[0];
}


function fetchInfo(userId) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        var url = 'http://localhost:9000/user/' + userId;

        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                var userData = JSON.parse(xhr.responseText);
                resolve(userData);
            } else {
                var error = 'Wystąpił błąd. Kod statusu: ' + xhr.status;
                reject(new Error(error));
            }
        };

        xhr.onerror = function () {
            var error = 'Wystąpił błąd podczas wysyłania żądania.';
            reject(new Error(error));
        };

        xhr.send();
    });
}
