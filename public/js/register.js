document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const firstName = document.getElementById("first-name").value;
      const lastName = document.getElementById("last-name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      // Validate passwords match
      if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
      }

      // Validate password length
      if (password.length < 8) {
          alert("Password must be at least 8 characters long.");
          return;
      }

      try {
          const response = await fetch("/api/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ firstName, lastName, email, password })
          });

          const data = await response.json();

          if (response.ok) {
              alert("Registration successful! Redirecting to login...");
              registerForm.reset();
              setTimeout(() => {
                  window.location.href = "/";
              }, 2000);
          } else {
              alert(data.message || "Registration failed. Please try again.");
          }
      } catch (error) {
          alert("An error occurred. Please try again later.");
      }
  });
});
