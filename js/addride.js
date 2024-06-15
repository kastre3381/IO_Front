document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('addRideForm');

    if (form) {
        // Pobierz userId z localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('Brak zapamiętanego identyfikatora użytkownika.');
            return;
        }

        try {
            // Pobierz dane użytkownika
            const userData = await fetchInfo(userId);
            form.addEventListener('submit', async (event) => {
                event.preventDefault();

                // Collect the form data
                const car = document.getElementById('car').value;
                const date = document.getElementById('date').value;
                const time = document.getElementById('time').value;
                const start = document.getElementById('IO_start').value;
                const finish = document.getElementById('IO_end').value;
                

                // Construct the payload with user data included
                const formData = {
                    car: car,
                    date: date,
                    time: time,
                    start: start,
                    finish: finish,
                    
                    user: {
                        role: 'driver', // Replace with actual user role if needed
                        ...userData  // Include user data fetched earlier
                    }
                };

                try {
                    const response = await fetch('http://jakw.ovh:9000/trip', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        const result = await response.json();
                        alert('Trip added successfully! Your trip ID is: ' + result._id);
                        // Handle successful response
						window.location.href = '../';
                    } else {
                        const error = await response.json();
                        alert('Adding trip failed: ' + (error.message || 'Unknown error'));
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while adding the trip. Please try again later.');
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
