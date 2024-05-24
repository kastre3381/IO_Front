document.addEventListener('DOMContentLoaded', (event) => {
    // Pobierz dzisiejszą datę w strefie czasowej Polski
    const today = new Date();
    const options = { timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formatter = new Intl.DateTimeFormat('pl-PL', options);
    const [{ value: day },,{ value: month },,{ value: year },,{ value: hour },,{ value: minute }] = formatter.formatToParts(today);

    // Formatowanie daty na YYYY-MM-DD
    const minDate = `${year}-${month}-${day}`;
    // Formatowanie godziny na HH:MM
    const minTime = `${hour}:${minute}`;

    // Ustaw dzisiejszą datę jako minimalną do wyboru
    document.getElementById('IO_add_ride_date').setAttribute('min', minDate);
    // Ustaw aktualną godzinę jako minimalną do wyboru
    document.getElementById('IO_add_ride_time').setAttribute('min', minTime);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const searchInput1 = document.getElementById('IO_add_ride_start');
    const select1 = document.getElementById('select1');
    const options1 = Array.from(select1.options);

    searchInput1.addEventListener('input', () => {
        const filter = searchInput1.value.toLowerCase();
        select1.innerHTML = '';
        options1.forEach(option => {
            if (option.text.toLowerCase().includes(filter)) {
                select1.appendChild(option);
            }
        });
    });

    const searchInput = document.getElementById('IO_add_ride_end');
    const select = document.getElementById('select2');
    const options = Array.from(select.options);

    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        select.innerHTML = '';
        options.forEach(option => {
            if (option.text.toLowerCase().includes(filter)) {
                select.appendChild(option);
            }
        });
    });
});