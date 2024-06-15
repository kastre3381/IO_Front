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
    const dateInput = document.getElementById('date');
    dateInput.setAttribute('min', minDate);

    const timeInput = document.getElementById('time');

    // Aktualizuj minimalną godzinę tylko wtedy, gdy dzisiejsza data jest wybrana
    dateInput.addEventListener('input', (event) => {
        if (event.target.value === minDate) {
            timeInput.setAttribute('min', minTime);
        } else {
            timeInput.removeAttribute('min');
        }
    });

    // Ustawienie minimalnej godziny przy ładowaniu strony, jeśli dzisiejsza data jest wybrana
    if (dateInput.value === minDate) {
        timeInput.setAttribute('min', minTime);
    }
});


document.addEventListener('DOMContentLoaded', (event) => {
    const searchInput1 = document.getElementById('IO_start');
    const select1 = document.getElementById('depature');
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

    const searchInput = document.getElementById('IO_end');
    const select = document.getElementById('destination');
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