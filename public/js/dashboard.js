document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn")
  
    logoutBtn.addEventListener("click", () => {
      // In a real application, you would call a logout API endpoint
      // For this example, we'll just redirect to the login page
      window.location.href = "/"
    })
  })
  
  