document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form")
    const errorMessage = document.getElementById("error-message")
    const successMessage = document.getElementById("success-message")
  
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault()
  
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value
  
      // Hide any existing messages
      errorMessage.classList.add("hidden")
      successMessage.classList.add("hidden")
  
      // Validate passwords match
      if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match."
        errorMessage.classList.remove("hidden")
        return
      }
  
      // Validate password length
      if (password.length < 8) {
        errorMessage.textContent = "Password must be at least 8 characters long."
        errorMessage.classList.remove("hidden")
        return
      }
  
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, password }),
        })
  
        const data = await response.json()
  
        if (response.ok) {
          // Show success message
          successMessage.textContent = "Registration successful! Redirecting to login..."
          successMessage.classList.remove("hidden")
  
          // Reset form
          registerForm.reset()
  
          // Redirect to login page after a short delay
          setTimeout(() => {
            window.location.href = "/"
          }, 2000)
        } else {
          // Show error message
          errorMessage.textContent = data.message || "Registration failed. Please try again."
          errorMessage.classList.remove("hidden")
        }
      } catch (error) {
        errorMessage.textContent = "An error occurred. Please try again later."
        errorMessage.classList.remove("hidden")
      }
    })
  })
  
  