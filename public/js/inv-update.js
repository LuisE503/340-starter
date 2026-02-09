// Enable/disable form submit button on change
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form")
  const submitButton = document.querySelector('button[type="submit"]')
  
  if (form && submitButton) {
    // Initial state: button is disabled
    submitButton.disabled = true
    
    // Listen for any input/change events in the form
    form.addEventListener("change", function () {
      submitButton.disabled = false
    })
    
    form.addEventListener("input", function () {
      submitButton.disabled = false
    })
  }
})
