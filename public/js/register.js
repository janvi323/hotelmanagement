document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form")
    const passwordInput = document.getElementById("password")
    const confirmPasswordInput = document.getElementById("confirm-password")
    const togglePasswordButtons = document.querySelectorAll(".toggle-password")
    const requirements = document.querySelectorAll(".requirement")
  
    // Toggle password visibility
    togglePasswordButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const input = button.previousElementSibling
        const icon = button.querySelector("i")
  
        if (input.type === "password") {
          input.type = "text"
          icon.classList.remove("fa-eye")
          icon.classList.add("fa-eye-slash")
        } else {
          input.type = "password"
          icon.classList.remove("fa-eye-slash")
          icon.classList.add("fa-eye")
        }
      })
    })
  
    // Function to show error message
    function showError(input, message) {
      const formGroup = input.closest(".form-group")
      formGroup.classList.add("error")
  
      // Remove any existing error message
      const existingError = formGroup.querySelector(".error-message")
      if (existingError) {
        existingError.remove()
      }
  
      // Add new error message
      const errorMessage = document.createElement("div")
      errorMessage.className = "error-message"
      errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`
      formGroup.appendChild(errorMessage)
    }
  
    // Function to clear error
    function clearError(input) {
      const formGroup = input.closest(".form-group")
      formGroup.classList.remove("error")
  
      const existingError = formGroup.querySelector(".error-message")
      if (existingError) {
        existingError.remove()
      }
    }
  
    // Function to validate email format
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    // Function to check password strength
    function checkPasswordStrength(password) {
      const hasLength = password.length >= 8
      const hasUppercase = /[A-Z]/.test(password)
      const hasNumber = /[0-9]/.test(password)
  
      // Update requirement indicators
      requirements.forEach((req) => {
        const type = req.getAttribute("data-requirement")
        const icon = req.querySelector("i")
  
        if (
          (type === "length" && hasLength) ||
          (type === "uppercase" && hasUppercase) ||
          (type === "number" && hasNumber)
        ) {
          req.classList.add("valid")
          icon.classList.remove("fa-circle")
          icon.classList.add("fa-check-circle")
        } else {
          req.classList.remove("valid")
          icon.classList.remove("fa-check-circle")
          icon.classList.add("fa-circle")
        }
      })
  
      return hasLength && hasUppercase && hasNumber
    }
  
    // Password input validation
    passwordInput.addEventListener("input", () => {
      checkPasswordStrength(passwordInput.value)
  
      // If confirm password has a value, check if they match
      if (confirmPasswordInput.value) {
        if (passwordInput.value !== confirmPasswordInput.value) {
          showError(confirmPasswordInput, "Passwords do not match")
        } else {
          clearError(confirmPasswordInput)
        }
      }
    })
  
    // Confirm password validation
    confirmPasswordInput.addEventListener("input", () => {
      if (passwordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, "Passwords do not match")
      } else {
        clearError(confirmPasswordInput)
      }
    })
  
    // Input validation on blur
    const inputs = registerForm.querySelectorAll("input")
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        validateInput(input)
      })
  
      input.addEventListener("input", () => {
        if (input.id !== "password" && input.id !== "confirm-password") {
          clearError(input)
        }
      })
    })
  
    // Validate individual input
    function validateInput(input) {
      const id = input.id
      const value = input.value.trim()
  
      if (value === "") {
        showError(input, "This field is required")
        return false
      }
  
      if (id === "email") {
        if (!isValidEmail(value)) {
          showError(input, "Please enter a valid email address")
          return false
        }
      }
  
      if (id === "password") {
        if (!checkPasswordStrength(value)) {
          showError(input, "Password doesn't meet requirements")
          return false
        }
      }
  
      if (id === "confirm-password") {
        const password = document.getElementById("password").value
        if (value !== password) {
          showError(input, "Passwords do not match")
          return false
        }
      }
  
      return true
    }
  
    // Form submission
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault()
  
      // Validate all inputs
      let isValid = true
      inputs.forEach((input) => {
        if (!validateInput(input)) {
          isValid = false
        }
      })
  
      if (!isValid) {
        return
      }
  
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
  
      // Show loading state
      const submitButton = registerForm.querySelector('button[type="submit"]')
      submitButton.classList.add("loading")
      const btnText = submitButton.querySelector(".btn-text")
      const originalButtonText = btnText.textContent
      const btnIcon = submitButton.querySelector("i")
      if (btnIcon) btnIcon.style.display = "none"
  
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, password }),
        })
  
        const data = await response.json()
  
        if (response.ok) {
          // Create success message if it doesn't exist
          let successMessage = document.querySelector(".success-message")
          if (!successMessage) {
            successMessage = document.createElement("div")
            successMessage.className = "success-message"
            successMessage.innerHTML =
              '<i class="fas fa-check-circle"></i> Registration successful! Redirecting to login...'
  
            // Insert before the form
            registerForm.parentNode.insertBefore(successMessage, registerForm)
          }
  
          // Reset form
          registerForm.reset()
  
          // Reset password requirements
          requirements.forEach((req) => {
            const icon = req.querySelector("i")
            req.classList.remove("valid")
            icon.classList.remove("fa-check-circle")
            icon.classList.add("fa-circle")
          })
  
          // Redirect after delay
          setTimeout(() => {
            window.location.href = "/login"
          }, 2000)
        } else {
          // Reset button
          submitButton.classList.remove("loading")
          btnText.textContent = originalButtonText
          if (btnIcon) btnIcon.style.display = "inline-block"
  
          // Create error banner
          const errorBanner = document.createElement("div")
          errorBanner.className = "error-banner"
          errorBanner.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${data.message || "Registration failed. Please try again."}`
  
          // Remove existing error banner if any
          const existingBanner = document.querySelector(".error-banner")
          if (existingBanner) {
            existingBanner.remove()
          }
  
          // Insert at the top of the form container
          const formTitle = document.querySelector(".form-subtitle")
          formTitle.parentNode.insertBefore(errorBanner, formTitle.nextSibling)
        }
      } catch (error) {
        // Reset button
        submitButton.classList.remove("loading")
        btnText.textContent = originalButtonText
        if (btnIcon) btnIcon.style.display = "inline-block"
  
        // Create error banner for network errors
        const errorBanner = document.createElement("div")
        errorBanner.className = "error-banner"
        errorBanner.innerHTML = '<i class="fas fa-exclamation-circle"></i> Network error. Please try again later.'
  
        // Remove existing error banner if any
        const existingBanner = document.querySelector(".error-banner")
        if (existingBanner) {
          existingBanner.remove()
        }
  
        // Insert at the top of the form container
        const formTitle = document.querySelector(".form-subtitle")
        formTitle.parentNode.insertBefore(errorBanner, formTitle.nextSibling)
      }
    })
  
    // Add animation to form elements
    const formGroups = document.querySelectorAll(".form-group")
    formGroups.forEach((group, index) => {
      group.style.animationDelay = `${index * 0.05}s`
    })
  
    // Currency selector functionality
    const currencyToggle = document.querySelector(".currency-selector")
    if (currencyToggle) {
      currencyToggle.addEventListener("click", () => {
        // This would typically open a currency selection dropdown
        alert("Currency selector would open here")
      })
    }
  })
  