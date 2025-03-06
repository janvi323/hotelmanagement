document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn")
  
    logoutBtn.addEventListener("click", () => {
      // In a real application, you would call a logout API endpoint
      // For this example, we'll just redirect to the login page
      window.location.href = "/"

    })

    // EliteEscapes Hotel Management Dashboard JavaScript


  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".md\\:hidden")
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      // Implementation for mobile menu toggle would go here
      alert("Mobile menu clicked")
    })
  }

  // Date picker initialization (placeholder for actual implementation)
  const dateInput = document.querySelector('input[placeholder="Check-in — Check-out"]')
  if (dateInput) {
    dateInput.addEventListener("click", () => {
      // In a real implementation, this would initialize a date picker
      // For now, we'll just show a message
      alert("Date picker would open here")
    })
  }

  // Guest selector initialization
  const guestInput = document.querySelector('input[placeholder="2 adults · 0 children · 1 room"]')
  if (guestInput) {
    guestInput.addEventListener("click", () => {
      // In a real implementation, this would open a dropdown
      alert("Guest selector would open here")
    })
  }

  // Destination carousel functionality
  const destinationButtons = document.querySelectorAll(".border-gray-300, .border-darkGreen")
  destinationButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      destinationButtons.forEach((btn) => {
        btn.classList.remove("bg-darkGreen", "text-ivory", "border-darkGreen")
        btn.classList.add("border-gray-300")
      })

      // Add active class to clicked button
      this.classList.remove("border-gray-300")
      this.classList.add("bg-darkGreen", "text-ivory", "border-darkGreen")

      // In a real implementation, this would filter destinations
    })
  })

  // Search functionality
  const searchButton = document.querySelector(".bg-yellow-500")
  const searchInput = document.querySelector('input[placeholder="Where are you going?"]')

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.trim()
      if (searchTerm === "") {
        alert("Please enter a destination")
      } else {
        alert(`Searching for: ${searchTerm}`)
        // In a real implementation, this would redirect to search results
      }
    })
  }

  // Add animation to featured properties
  const featuredProperties = document.querySelectorAll(".featured-property")
  featuredProperties.forEach((property) => {
    property.classList.add("animate-fadeInUp")
  })

  // Currency toggle functionality (placeholder)
  const currencyToggle = document.querySelector(".text-yellow-200")
  if (currencyToggle) {
    currencyToggle.addEventListener("click", () => {
      alert("Currency selector would open here")
    })
  }

  // Implement smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Add hover effects to property cards
  const propertyCards = document.querySelectorAll(".bg-white.rounded-lg.shadow-md")
  propertyCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("shadow-lg", "transform", "scale-[1.02]", "transition-all", "duration-300")
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("shadow-lg", "transform", "scale-[1.02]")
    })
  })

  // Simulate loading state for search
  const searchForm = document.querySelector(".bg-white.rounded-lg.p-2")
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const searchButton = this.querySelector("button")
      searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...'
      searchButton.disabled = true

      // Simulate API call
      setTimeout(() => {
        searchButton.innerHTML = "Search"
        searchButton.disabled = false
        alert("Search results would load here")
      }, 1500)
    })
  }
})


  
  
  