document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('IO_register_email').value;
            const password = document.getElementById('IO_register_passwd').value;

            try {
                const response = await fetch('http://localhost:9000/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const users = await response.json();
                    const user = users.find(user => user.email === email && user.password === password);

                    if (user) {
                        // Zalogowano użytkownika - przekieruj na stronę loggedinmain.html
                        alert('Zalogowano pomyślnie!');
                        // Zapamiętaj identyfikator użytkownika w lokalnym magazynie
                        localStorage.setItem('userId', user._id);
                        alert(localStorage.getItem('userId'));
                        alert('Zalogowano pomyślnie! Twój identyfikator użytkownika to: ' + user._id);  
                        // Przekierowanie na stronę loggedinmain.html
                        window.location.href = '../';
                    } else {
                        alert('Nieprawidłowy e-mail lub hasło.');
                    }
                } else {
                    alert('Wystąpił błąd podczas logowania.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Wystąpił błąd podczas logowania. Spróbuj ponownie później.');
            }
        });
    } else {
        console.error('Form element not found');
    }
});

