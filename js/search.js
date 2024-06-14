document.addEventListener('DOMContentLoaded', async () => {
    const addRideForm = document.getElementById('addRideForm');

    if (addRideForm) {
        addRideForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Pobierz wartości pól formularza
            const start = document.getElementById("IO_start").value;
            const finish = document.getElementById("IO_end").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const passengers = document.getElementById("passengers").value;
            const liczba_pasazerow = document.getElementById('IO_spn_liczba_pasazerow').value;

            // Sprawdź, czy pola nie są puste (null lub undefined)
            const formData = {};
            if (start) formData.start = start;
            if (finish) formData.finish = finish;
            if (date) formData.date = date;
            if (time) formData.time = time;
            if (passengers) formData.passengers = passengers;
            if (liczba_pasazerow) formData.liczba_pasazerow = liczba_pasazerow;

            try {
                // Przygotowanie parametrów URL
                const queryString = new URLSearchParams(formData).toString();
                const url = `http://localhost:9000/v2/trip?${queryString}`;

                // Wywołanie fetch z metodą GET
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Result:', result.body);
                    displayTrips(result.body);
                } else {    
                    const error = await response.json();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.error('Form element not found');
    }
});



// Funkcja do wyświetlania wyników przejazdów w tabeli
function displayTrips(trips) {
    const tableBody = document.querySelector(".table tbody");
    tableBody.innerHTML = ""; 
    trips.forEach((trip, index) => {
        
        const row = `
            <tr>
                <td class="number text-center">${index + 1}</td>
                <td class="trip-info">
                    <strong>Trip ${index + 1}</strong><br>
                    <span><strong>Car:</strong> ${trip.car}</span><br>
                    <span><strong>Date:</strong> ${trip.date}</span><br>
                    <span><strong>Time:</strong> ${trip.time}</span><br>
                    <span><strong>Start:</strong> ${trip.start}</span><br>
                    <span><strong>Finish:</strong> ${trip.finish}</span><br>
                    <span><strong>User:</strong> ${trip.user.username} (${trip.user.name} ${trip.user.surname})</span>
                </td>
                <td class="action text-right" style="position: relative;">
                    <button class="btn btn-primary" style="position: absolute; bottom: 10px; right: 10px;" onclick="reserveRide('${trip._id}')">Zarezerwuj</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Funkcja do generowania gwiazdek oceny
function getStars(rating) {
    const starCount = Math.round(rating);
    let stars = "";
    for (let i = 0; i < 5; i++) {
        if (i < starCount) {
            stars += '<i class="fa fa-star"></i>';
        } else {
            stars += '<i class="fa fa-star-o"></i>';
        }
    }
    return stars;
}

async function reserveRide(tripID) {
    try {
        // Pobierz szczegóły tripa za pomocą fetchTripById
        const tripData = await fetchTripById(tripID);
        if (!tripData) {
            console.error('No trip data found');
            return false;
        }

        // Pobierz dane użytkownika z lokalnego przechowywania
        const userId = localStorage.getItem('userId');

        if (!userId) {
            console.error('User not logged in');
            return false;
        }

        // Zaktualizuj dane tripa o pole reserved
        tripData.reserved = {
            userId: userId,
            reservedAt: new Date()
        };

        // Wywołaj endpoint PUT `/trip/:tripID` w serwerze
        const response = await fetch(`http://localhost:9000/trip/${tripID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripData) // Wyślij pełne zaktualizowane dane tripa
        });

        if (response.ok) {
            console.log(`Trip ${tripID} successfully reserved for user ${userId}`);
            return true;
        } else {
            const error = await response.json();
            console.error('Error reserving trip:', error.message || 'Unknown error');
            return false;
        }
    } catch (error) {
        console.error('Error reserving trip:', error);
        return false;
    }
}

// Funkcja do pobierania szczegółów tripa po ID
async function fetchTripById(tripID) {
    try {
        const response = await fetch(`http://localhost:9000/trips/${tripID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const tripData = await response.json();
            console.log('Trip data:', tripData);
            return tripData.body; // zakładając, że `body` jest tablicą i chcemy pierwszy element
        } else {
            if (response.status === 404) {
                console.error('Trip not found');
                return null;
            } else {
                const error = await response.json();
                console.error('Error fetching trip:', error.message || 'Unknown error');
                return null;
            }
        }
    } catch (error) {
        console.error('Error fetching trip:', error);
        return null;
    }
}

