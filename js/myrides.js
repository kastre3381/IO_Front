document.addEventListener('DOMContentLoaded', async () => {
    // Znajdujemy przycisk po jego ID
    const showTripsButton = document.getElementById("showTripsButton");
    const userId = localStorage.getItem('userId');

    // Dodajemy event listener na kliknięcie przycisku
    showTripsButton.addEventListener('click', async () => {
    
        try {
            // Wywołujemy endpoint /v2/trip/ z odpowiednimi parametrami
            const response = await fetch(`http://localhost:9000/trip`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                    // Tutaj możesz dodać inne nagłówki, jeśli są wymagane
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Odczytujemy dane JSON z odpowiedzi
            const data = await response.json();
            console.log(data); // Możesz dalej przetwarzać otrzymane dane tutaj
            generateTripListHTML(data, userId);
        } catch (error) {
            console.error('Fetch Error:', error);
            // Tutaj obsługujemy błędy zapytania
        }
    });
});

function generateTripListHTML(trips, userId) {
    const tripList = document.getElementById('TripList');
    tripList.innerHTML = ''; // Wyczyść zawartość listy, jeśli była już wcześniej wypełniona
    const filteredTrips = trips.body.filter(trip => trip.reserved.userId === userId);
    filteredTrips.forEach(trip => {
        // trips.body.forEach(trip => {
        const li = document.createElement('li');
        li.classList.add('media');
        li.innerHTML = `
            <div class="media-body">
    <p class="trip-info">
        <span class="label">Start:</span> ${trip.start}
        <span class="label">Finish:</span> <span class="value finish">${trip.finish}</span>
        <span class="label">Date:</span> <span class="value date">${trip.date}</span>
        <span class="label">Time:</span> <span class="value time">${trip.time}</span>
    </p>
</div>

        `;
        tripList.appendChild(li);
    });
}
