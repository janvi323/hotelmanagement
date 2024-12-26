document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');
    const container = document.querySelector('.container');
    const goToSignupButton = document.getElementById('goToSignup');

    // GSAP animation
    gsap.to(container, {duration: 1, opacity: 1, y: 0, ease: "power3.out"});

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                message.textContent = 'Login successful!';
                message.style.color = '#006400';
                gsap.to(message, {duration: 0.5, opacity: 1, y: 0, ease: "power2.out"});
                // Redirect to dashboard or show success message
            } else {
                message.textContent = data.message || 'Login failed. Please try again.';
                message.style.color = '#8B0000';
                gsap.to(message, {duration: 0.5, opacity: 1, y: 0, ease: "power2.out"});
            }
        } catch (error) {
            message.textContent = 'An error occurred. Please try again.';
            message.style.color = '#8B0000';
            gsap.to(message, {duration: 0.5, opacity: 1, y: 0, ease: "power2.out"});
        }
    });

    goToSignupButton.addEventListener('click', () => {
        window.location.href = 'http://localhost:3001/signup.html';
    });

    // Animate form inputs on focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {duration: 0.3, scale: 1.05, ease: "power2.out"});
        });
        input.addEventListener('blur', () => {
            gsap.to(input, {duration: 0.3, scale: 1, ease: "power2.out"});
        });
    });
});

