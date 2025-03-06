document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form")
    const errorMessage = document.getElementById("error-message")
  
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()
  
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
  
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
  
        const data = await response.json()
  
        if (response.ok) {
          // Redirect to dashboard on successful login
          window.location.href = "/dashboard"
        } else {
          // Show error message
          errorMessage.textContent = data.message || "Login failed. Please try again."
          errorMessage.classList.remove("hidden")
        }
      } catch (error) {
        errorMessage.textContent = "An error occurred. Please try again later."
        errorMessage.classList.remove("hidden")
      }
    })
  })
  
  