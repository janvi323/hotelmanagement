document.addEventListener('DOMContentLoaded', function() {
    const form1 = document.getElementById('booking-form');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const slides = document.querySelectorAll('.slide');

    // Set up background slideshow
    const images = [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
    ];

    slides.forEach((slide, index) => {
        slide.style.backgroundImage = `url(${images[index]})`;
    });

    let currentSlide = 0;
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    slides[0].classList.add('active');
    setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Set min date for start date to today
    const today = new Date().toISOString().split('T')[0];
    startDateInput.min = today;

    startDateInput.addEventListener('change', function() {
        // Set min date for end date to start date
        endDateInput.min = this.value;
        
        // If end date is before new start date, update it
        if (endDateInput.value < this.value) {
            endDateInput.value = this.value;
        }
    });

    // Corrected event listener (merged both into one)
    form1.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form1);
        const bookingData = Object.fromEntries(formData.entries());

        console.log('Booking Data:', bookingData);
        alert('Form submitted! Check console for values.');

        // Send data to backend
        const userId = "1741023486972"; // Actual logged-in user ID

        fetch("/api/saveBooking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, bookingDetails: bookingData })
        })
        .then(response => response.json())
        .then(data => console.log("Booking Saved:", data))
        .catch(error => console.error("Error:", error));
    });

    // Add animation delay to form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${0.1 * (index + 1)}s`;
    });
});
