function fetchMyInfo(userId) {
    fetchInfo(userId)
        .then(userData => {
            // Ustawianie danych w odpowiednich polach na stronie
            document.getElementById('IO_h1_user_name').innerText = userData.name;
            document.getElementById('IO_h1_user_surname').innerText = userData.surname;
            document.getElementById('IO_h1_user_email').innerText = userData.email;
            document.getElementById('IO_h1_user_pesel').innerText = userData.pesel;
        })
        .catch(error => {
            console.error(error);
            // Obsługa błędów, np. wyświetlenie komunikatu o błędzie
        });
}

function fetchInfo(userId) {
    return new Promise((resolve, reject) => {
        // Tworzenie obiektu XMLHttpRequest
        var xhr = new XMLHttpRequest();
        localStorage.setItem('userId', userId);
        // Definiowanie adresu URL endpointu
        var url = 'http://localhost:9000/user/' + userId; // Użyj poprawnego adresu URL

        // Konfiguracja żądania
        xhr.open('GET', url, true);

        // Określenie, co zrobić po odebraniu odpowiedzi
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Parsowanie odpowiedzi jako JSON i rozwiązanie obietnicy
                var userData = JSON.parse(xhr.responseText);
                resolve(userData);
            } else {
                // Obsługa błędu i odrzucenie obietnicy
                var error = 'Wystąpił błąd. Kod statusu: ' + xhr.status;
                reject(new Error(error));
            }
        };

        // Obsługa błędów związanych z żądaniem i odrzucenie obietnicy
        xhr.onerror = function () {
            var error = 'Wystąpił błąd podczas wysyłania żądania.';
            reject(new Error(error));
        };

        // Wysłanie żądania
        xhr.send();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchMyInfo(localStorage.getItem('userId'));
});


function fetchUserInfo() {
    // Pobranie zapamiętanego id użytkownika z localStorage
    var userId = localStorage.getItem('userId');

    // Sprawdzenie, czy id użytkownika istnieje
    if (userId) {
        // Wywołanie funkcji fetchMyInfo z przekazanym id użytkownika
        fetchMyInfo(userId);
    } else {
        console.error('Brak zapamiętanego identyfikatora użytkownika.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchUserInfo();
});
