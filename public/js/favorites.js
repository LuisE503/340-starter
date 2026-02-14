document.addEventListener("DOMContentLoaded", function() {
  // Initialize favorite buttons on detail page
  const favoriteSection = document.getElementById("favorite-section");
  if (favoriteSection) {
    const invId = favoriteSection.dataset.invId;
    checkFavoriteStatus(invId);
  }

  // Add event listeners for favorite buttons on detail page
  const addBtn = document.getElementById("add-to-favorites-btn");
  const removeBtn = document.getElementById("remove-from-favorites-btn");

  if (addBtn) {
    addBtn.addEventListener("click", function() {
      const invId = this.dataset.invId;
      addToFavorites(invId);
    });
  }

  if (removeBtn) {
    removeBtn.addEventListener("click", function() {
      const invId = this.dataset.invId;
      removeFromFavorites(invId);
    });
  }

  // Add event listeners for remove buttons on favorites list page
  const removeBtns = document.querySelectorAll(".remove-favorite-btn");
  removeBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const invId = this.dataset.invId;
      removeFromFavorites(invId, true);
    });
  });
});

// Check if vehicle is already in favorites
async function checkFavoriteStatus(invId) {
  try {
    const response = await fetch(`/favorites/check?inv_id=${invId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    const addBtn = document.getElementById("add-to-favorites-btn");
    const removeBtn = document.getElementById("remove-from-favorites-btn");

    if (data.success) {
      if (data.isFavorite) {
        // Show remove button if it's already a favorite
        if (addBtn) addBtn.style.display = "none";
        if (removeBtn) removeBtn.style.display = "inline-block";
      } else {
        // Show add button if it's not a favorite
        if (addBtn) addBtn.style.display = "inline-block";
        if (removeBtn) removeBtn.style.display = "none";
      }
    } else if (data.loggedIn === false) {
      // User not logged in, hide both buttons
      if (addBtn) addBtn.style.display = "none";
      if (removeBtn) removeBtn.style.display = "none";
    }
  } catch (error) {
    console.error("Error checking favorite status:", error);
  }
}

// Add vehicle to favorites
async function addToFavorites(invId) {
  try {
    const response = await fetch("/favorites/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inv_id: invId })
    });

    const data = await response.json();

    if (data.success) {
      // Update button display
      const addBtn = document.getElementById("add-to-favorites-btn");
      const removeBtn = document.getElementById("remove-from-favorites-btn");
      if (addBtn) addBtn.style.display = "none";
      if (removeBtn) removeBtn.style.display = "inline-block";

      // Show success message
      showMessage(data.message, "success");
    } else {
      showMessage(data.message || "Failed to add to favorites", "error");
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    showMessage("An error occurred. Please try again.", "error");
  }
}

// Remove vehicle from favorites
async function removeFromFavorites(invId, isListPage = false) {
  try {
    const response = await fetch("/favorites/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inv_id: invId })
    });

    const data = await response.json();

    if (data.success) {
      if (isListPage) {
        // On list page, remove the row from the table
        const row = document.querySelector(`tr[data-inv-id="${invId}"]`);
        if (row) {
          row.remove();
        }

        // Check if there are no more favorites
        const remainingRows = document.querySelectorAll(".favorites-table tbody tr");
        if (remainingRows.length === 0) {
          // Reload the page to show "no favorites" message
          location.reload();
        }
      } else {
        // On detail page, update button display
        const addBtn = document.getElementById("add-to-favorites-btn");
        const removeBtn = document.getElementById("remove-from-favorites-btn");
        if (addBtn) addBtn.style.display = "inline-block";
        if (removeBtn) removeBtn.style.display = "none";
      }

      showMessage(data.message, "success");
    } else {
      showMessage(data.message || "Failed to remove from favorites", "error");
    }
  } catch (error) {
    console.error("Error removing from favorites:", error);
    showMessage("An error occurred. Please try again.", "error");
  }
}

// Show message to user
function showMessage(message, type) {
  // Create message element
  const messageDiv = document.createElement("div");
  messageDiv.className = `flash-message ${type}`;
  messageDiv.textContent = message;

  // Insert at the top of the page
  const main = document.querySelector("main") || document.body;
  main.insertBefore(messageDiv, main.firstChild);

  // Remove after 3 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}
