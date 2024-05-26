document.addEventListener('DOMContentLoaded', (event) => {
    // Pobierz dzisiejszą datę w strefie czasowej Polski
    const today = new Date();
    const options = { timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formatter = new Intl.DateTimeFormat('pl-PL', options);
    const [{ value: day },,{ value: month },,{ value: year },,{ value: hour },,{ value: minute }] = formatter.formatToParts(today);

    // Formatowanie daty na YYYY-MM-DD
    const minDate = `${year}-${month}-${day}`;

    // Ustaw dzisiejszą datę jako minimalną do wyboru
    document.getElementById('IO_date').setAttribute('min', minDate);
});