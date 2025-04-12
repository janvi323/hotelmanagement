
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");
  
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove("hidden");
    }
  
    function hideError() {
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");
    }
  
    // Toggle password functionality
    const passwordInput = document.getElementById("password");
    const togglePassword = document.createElement("button");
    togglePassword.type = "button";
    togglePassword.textContent = "Show";
    togglePassword.className = "toggle-password";
    togglePassword.style.position = "absolute";
    togglePassword.style.right = "10px";
    togglePassword.style.top = "50%";
    togglePassword.style.transform = "translateY(-50%)";
    togglePassword.style.background = "none";
    togglePassword.style.border = "none";
    togglePassword.style.cursor = "pointer";
    togglePassword.style.fontSize = "0.8rem";
  
    const passwordWrapper = document.createElement("div");
    passwordWrapper.style.position = "relative";
  
    const passwordParent = passwordInput.parentNode;
    passwordParent.removeChild(passwordInput);
    passwordWrapper.appendChild(passwordInput);
    passwordWrapper.appendChild(togglePassword);
    passwordParent.appendChild(passwordWrapper);
  
    togglePassword.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        this.textContent = type === "password" ? "Show" : "Hide";
    });
  
    // Submit handler
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        hideError();
  
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        if (!email || !password) {
            showError("Please enter both email and password.");
            return;
        }
  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("Please enter a valid email address.");
            return;
        }
  
        if (password.length < 6) {
            showError("Password must be at least 6 characters long.");
            return;
        }
  
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
  
            const data = await response.json();
            console.log('Server response:', data);  // Debugging server response
  
            if (response.ok) {
                window.location.href = "/dashboard"; // Successful login
            } else {
                showError(data.message || "Login failed. Please try again.");
                if (data.message && data.message.includes("register")) {
                    const registerMsg = document.createElement("p");
                    registerMsg.innerHTML = `Not registered? <a href="/register">Register here</a>`;
                    errorMessage.appendChild(registerMsg);
                }
            }
        } catch (error) {
            showError("An error occurred. Please try again later.");
            console.error('Error during login request:', error);  // Log error for debugging
        }
    });
  });
  