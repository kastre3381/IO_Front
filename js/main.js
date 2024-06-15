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
        navbarContent.innerHTML = `
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li>
            <a id="homeLink" class="nav-link px-2 text-white" style="cursor: pointer;">
                <img src="../images/icons/IO_icon.svg" class="img-fluid img-thumbnail" alt="Logo" style="width: 40px; height: auto;">
                Strona domowa
            </a>
        </li>
        <li>
            <a href="/search/" class="nav-link px-2 text-white">
                <img src="../images/icons/IO_add.png" class="img-fluid img-thumbnail" alt="Logo" style="width: 40px; height: auto;">
                Wyszukaj przejazd
            </a>
        </li>
        <li>
            <a href="about.html" class="nav-link px-2 text-white">
                <img src="../images/icons/IO_about.png" class="img-fluid img-thumbnail" alt="Logo" style="width: 40px; height: auto;">
                O nas
            </a>
        </li>
    </ul>
    <div class="text-end">
        <button type="button" class="btn btn-outline-light me-2" onclick="logout()">Wyloguj się</button>
        <img src="../images/icons/profile_picture.png" class="img-fluid img-thumbnail" alt="Logo" style="width: 80px; height: auto;" id="IO_img_user_profile_image">
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Konto
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item" onclick="window.location.href='/myinfo/index.html'">Moje informacje</button>
                <button class="dropdown-item" onclick="window.location.href='/settings/index.html'">Ustawienia</button>
            </div>
        </div>
        <!-- Nowe przyciski -->
        <a href="../addRide/index.html" class="btn btn-outline-light me-2">Dodaj przejazd</a>
        <a href="../addCar/index.html" class="btn btn-outline-light">Dodaj pojazd</a>
    </div>
</div>

        `;
    } else {
        navbarContent.innerHTML = `
            <div id="navbarContent">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a id="homeLink" class="nav-link px-2 text-white" style="cursor: pointer;">
                <img src="../images/icons/IO_icon.svg" class="img-fluid img-thumbnail" alt="Logo" style="width: 40px; height: auto;">
                Strona domowa
            </a>
            </li>
            <li>
              <a href="/search/" class="nav-link px-2 text-white">
                <img src="../images/icons/IO_add.png" class="img-fluid img-thumbnail" alt="Logo" style="width: 40px; height: auto;">
                Wyszukaj przejazd
              </a>
            </li>
            <li>
              <a href="/about" class="nav-link px-2 text-white">
                <img src="../images/icons/IO_about.png" class="img-fluid img-thumbnail" alt="Logo" style="width: 40px; height: auto;">
                O nas
              </a>
            </li>
          </ul>
    

        <div class="text-end">
          <a href="/login" class="btn btn-outline-light me-2">Zaloguj się</a>
          <a href="/register" class="btn btn-warning">Utwórz konto</a>
        </div>
        </div>
    </div>
        `;
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


