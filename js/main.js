function liczba_pasazerow_slider()
{
    document.getElementById("IO_spn_liczba_pasazerow").innerHTML = "Liczba pasażerów: " + document.getElementById("passengers").value;
}
function logout() {
    // Usuń identyfikator użytkownika z localStorage
    localStorage.removeItem('userId');

    // Przekieruj użytkownika na stronę główną
    window.location.href = '/';
}

document.addEventListener('DOMContentLoaded', () => {
    // Sprawdzanie, czy użytkownik jest zalogowany
    const isLoggedIn = checkIfLoggedIn(); // Tu możesz umieścić funkcję sprawdzającą, czy użytkownik jest zalogowany

    // Pobranie elementu <div> z paskiem nawigacyjnym
    const navbarContent = document.getElementById('navbarContent');

    // Dynamiczna zmiana zawartości paska nawigacyjnego
    if (isLoggedIn) {
        fetch('../html/logged_in_navbar.html')
            .then(response => response.text())
            .then(html => {
                navbarContent.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading the logged-in navbar:', error);
            });
    } else {
        fetch('../html/logged_out_navbar.html')
            .then(response => response.text())
            .then(html => {
                navbarContent.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading the logged-out navbar:', error);
            });
    }
});

function checkIfLoggedIn() {
    const userId = localStorage.getItem('userId');
    const currentPage = window.location.pathname;
    
    if (!userId) {
        return false
    } else {
        return true
    }
}


