document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const message = document.getElementById('message');
    const container = document.querySelector('.container');
    const goToLoginButton = document.getElementById('goToLogin');

    // GSAP animation
    gsap.to(container, {duration: 1, opacity: 1, y: 0, ease: "power3.out"});

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            message.textContent = 'Passwords do not match.';
            message.style.color = '#8B0000';
            gsap.to(message, {duration: 0.5, opacity: 1, y: 0, ease: "power2.out"});
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                message.textContent = 'Sign up successful! Please log in.';
                message.style.color = '#006400';
                gsap.to(message, {duration: 0.5, opacity: 1, y: 0, ease: "power2.out"});
                setTimeout(() => {
                    window.location.href = 'http://localhost:3000/login.html';
                }, 2000);
            } else {
                message.textContent = data.message || 'Sign up failed. Please try again.';
                message.style.color = '#8B0000';
                gsap.to(message, {duration: 0.5, opacity: 1, y: 0, ease: "power2.out"});
            }
        } catch (error) {
            message.textContent = 'An error occurred. Please try again.';
            message.style.color = '#8B0000';
            gsap.to(message, {duration: 0.5, opacity: 1, y: 0, ease: "power2.out"});
        }
    });

    goToLoginButton.addEventListener('click', () => {
        window.location.href = 'http://localhost:3000/login.html';
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

