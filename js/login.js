document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('IO_register_email').value;
            const password = document.getElementById('IO_register_passwd').value;

            try {
                const response = await fetch('http://jakw.ovh:9000/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
					body: JSON.stringify({
						'email' : email,
						'password' : password
					})
                });

                if (response.ok) {
                    const user = await response.json();
                    if (user) {
                        alert('Zalogowano pomyślnie!');
                        localStorage.setItem('userId', user._id);
                        window.location.href = '../';
                    }
                } else if (response.status == 400 || response.status == 403) {
					alert('Nieprawidłowy e-mail lub hasło.');
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

