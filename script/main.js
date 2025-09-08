// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initNavigation()
  initScrollEffects()
  initSkillBars()
  initProjectFilter()
  initContactForm()
  initAnimations()
})

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  // Update active nav link based on current page
  updateActiveNavLink()
}

// Update active navigation link
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (
      link.getAttribute("href") === currentPage ||
      (currentPage === "" && link.getAttribute("href") === "index.html")
    ) {
      link.classList.add("active")
    }
  })
}

// Scroll effects
function initScrollEffects() {
  const navbar = document.getElementById("navbar")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-fill")

  // Intersection Observer for skill bars
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillFill = entry.target
          const width = skillFill.getAttribute("data-width")
          setTimeout(() => {
            skillFill.style.width = width + "%"
          }, 200)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => {
    skillObserver.observe(bar)
  })
}

// Project filter functionality
function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card[data-category]")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter projects
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          card.classList.remove("hidden")
          card.style.display = "block"
        } else {
          card.classList.add("hidden")
          setTimeout(() => {
            if (card.classList.contains("hidden")) {
              card.style.display = "none"
            }
          }, 300)
        }
      })
    })
  })
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contact-form")
  const formSuccess = document.getElementById("form-success")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const formObject = {}
      formData.forEach((value, key) => {
        formObject[key] = value
      })

      // Validate form
      if (validateForm(formObject)) {
        // Show loading state
        showLoadingState(true)

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
          showLoadingState(false)
          showSuccessMessage()
          contactForm.reset()
        }, 2000)
      }
    })
  }
}

// Form validation
function validateForm(data) {
  let isValid = true
  const errors = {}

  // Clear previous errors
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = ""
  })

  // Validate name
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long"
    isValid = false
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address"
    isValid = false
  }

  // Validate subject
  if (!data.subject || data.subject.trim().length < 5) {
    errors.subject = "Subject must be at least 5 characters long"
    isValid = false
  }

  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters long"
    isValid = false
  }

  // Display errors
  Object.keys(errors).forEach((field) => {
    const errorElement = document.getElementById(field + "-error")
    if (errorElement) {
      errorElement.textContent = errors[field]
    }
  })

  return isValid
}

// Show loading state
function showLoadingState(loading) {
  const submitBtn = document.querySelector('.contact-form button[type="submit"]')
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")

  if (loading) {
    btnText.style.display = "none"
    btnLoading.style.display = "inline-block"
    submitBtn.disabled = true
  } else {
    btnText.style.display = "inline-block"
    btnLoading.style.display = "none"
    submitBtn.disabled = false
  }
}

// Show success message
function showSuccessMessage() {
  const contactForm = document.getElementById("contact-form")
  const formSuccess = document.getElementById("form-success")

  contactForm.style.display = "none"
  formSuccess.style.display = "block"

  // Hide success message after 5 seconds
  setTimeout(() => {
    formSuccess.style.display = "none"
    contactForm.style.display = "block"
  }, 5000)
}

// Initialize animations
function initAnimations() {
  // Fade in animation for elements
  const animatedElements = document.querySelectorAll(".skill-item, .project-card, .timeline-item")

  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    animationObserver.observe(element)
  })
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Console log for debugging
console.log("[v0] Portfolio website loaded successfully")

// Add some interactive hover effects
document.addEventListener("DOMContentLoaded", () => {
  // Skill items hover effect
  const skillItems = document.querySelectorAll(".skill-item")
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Project cards parallax effect on scroll
  window.addEventListener(
    "scroll",
    debounce(() => {
      const scrolled = window.pageYOffset
      const projectCards = document.querySelectorAll(".project-card")

      projectCards.forEach((card, index) => {
        const rate = scrolled * -0.5
        card.style.transform = `translateY(${rate * (index % 2 === 0 ? 1 : -1) * 0.1}px)`
      })
    }, 10),
  )
})
