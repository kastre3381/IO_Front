document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('IO_register_name').value;
            const surname = document.getElementById('IO_register_surname').value;

            const formData = {
                name: name,
                surname: surname,
                username: `${name}${surname}`, // Concatenating name and surname for username
                pesel: document.getElementById('IO_register_pesel').value,
                email: document.getElementById('IO_register_email').value,
                password: document.getElementById('IO_register_passwd').value,
                role : 'regular'
                
            };
            alert(JSON.stringify(formData));
            try {
                const response = await fetch('http://localhost:9000/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                alert(response.body._id)
                if (response.ok) {
                    const result = await response.json();
                    alert('Registration successful! Your user ID is: ' + result.newId);
                    localStorage.setItem('userId', result.newId);
                        // Przekierowanie na stronę loggedinmain.html
                        window.location.href = '../';
                } else {
                    const error = await response.json();
                    alert('Registration failed: ' + (error.message || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while registering. Please try again later.');
            }
        });
    } else {
        console.error('Form element not found');
    }
});
