document.addEventListener('DOMContentLoaded', async () => {
    const showVehiclesButton = document.getElementById('showVehiclesButton');
    const vehiclesDropdown = document.getElementById('car');

    showVehiclesButton.addEventListener('click', async () => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            console.error('User ID not found in localStorage.');
            return;
        }

        try {
            const cars = await fetchCarsByUserId(userId);
            displayCarsInDropdown(cars);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    });

    async function fetchCarsByUserId(userId) {
        const response = await fetch(`http://jakw.ovh:9000/cars/${userId}`);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Unknown error occurred');
        }

        return await response.json();
    }

    function displayCarsInDropdown(cars) {
        let optionsHTML = '';

        cars.forEach(car => {
            optionsHTML += `<option> ${car.marka} ${car.model} - ${car.numer_rejestracyjny} (${car.data_rejestracji})</option>`;
        });

        vehiclesDropdown.innerHTML = optionsHTML;
    }
});
