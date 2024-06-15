document.addEventListener('DOMContentLoaded', async () => {
    const showVehiclesButton = document.getElementById('showVehiclesButton');
    const vehiclesList = document.getElementById('vehiclesList');
    
    showVehiclesButton.addEventListener('click', async () => {
        const userId = localStorage.getItem('userId');
        localStorage.setItem('userId', userId);
        if (!userId) {
            console.error('User ID not found in localStorage.');
            return;
        }

        try {
            const cars = await fetchCarsByUserId(userId);
            displayCars(cars);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    });

    async function fetchCarsByUserId(userId) {
        const response = await fetch(`http://localhost:9000/cars/${userId}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Unknown error occurred');
        }

        return await response.json();
    }

    function displayCars(cars) {
        vehiclesList.innerHTML = ''; // Clear the list before adding new items
        cars.forEach(car => {
            const listItem = document.createElement('li');
            listItem.textContent = `${car.marka} ${car.model} - ${car.numer_rejestracyjny} (${car.data_rejestracji})`;
            vehiclesList.appendChild(listItem);
        });
    }
});
