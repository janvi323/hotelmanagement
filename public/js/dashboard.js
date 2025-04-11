
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-btn")
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      const navList = document.querySelector(".nav-list")
      navList.classList.toggle("show")
    })
  }

  // Date picker initialization
  const dateInput = document.querySelector(".date-input")
  if (dateInput) {
    dateInput.addEventListener("click", () => {
      // In a real implementation, this would initialize a date picker
      alert("Date picker would open here")
    })
  }

  // Guest selector initialization
  const guestInput = document.querySelector(".guest-input")
  if (guestInput) {
    guestInput.addEventListener("click", () => {
      // In a real implementation, this would open a dropdown
      alert("Guest selector would open here")
    })
  }

  // Category filter functionality
  const categoryButtons = document.querySelectorAll(".category-btn")
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => {
        btn.classList.remove("active")
      })

      // Add active class to clicked button
      this.classList.add("active")

      // In a real implementation, this would filter destinations
    })
  })

  // Search functionality
  const searchButton = document.querySelector(".search-btn")
  const searchInput = document.querySelector(".search-input")

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

  // Add animation to cards
  const cards = document.querySelectorAll(".offer-card, .destination-card, .property-type-card")

  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Add animation class when elements come into view
  function animateOnScroll() {
    cards.forEach((card) => {
      if (isInViewport(card)) {
        card.classList.add("animate-fadeInUp")
      }
    })
  }

  // Initial check
  animateOnScroll()

  // Check on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Currency toggle functionality
  const currencyToggle = document.querySelector(".currency-selector")
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

  // Add hover effects to destination cards
  const destinationCards = document.querySelectorAll(".destination-card")

  destinationCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)"
      this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)"
    })
  
    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
      this.style.boxShadow = "var(--shadow)"
    })
  })
  
})
