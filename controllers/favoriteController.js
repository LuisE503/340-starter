const favoriteModel = require("../models/favorite-model")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const favCont = {}

/* ***************************
 *  Build favorites list view
 * ************************** */
favCont.buildFavoritesList = async function (req, res, next) {
  let nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id
  
  try {
    const favorites = await favoriteModel.getFavoritesByAccountId(account_id)
    
    res.render("./favorites/list", {
      title: "My Favorite Vehicles",
      nav,
      errors: null,
      favorites: favorites || [],
    })
  } catch (error) {
    console.error("buildFavoritesList error: " + error)
    req.flash("notice", "Error loading favorites. Please try again.")
    res.redirect("/account/")
  }
}

/* ***************************
 *  Add vehicle to favorites (AJAX)
 * ************************** */
favCont.addToFavorites = async function (req, res, next) {
  const { inv_id } = req.body
  const account_id = res.locals.accountData.account_id
  
  try {
    // Validate that vehicle exists
    const vehicleExists = await invModel.getInventoryById(inv_id)
    if (!vehicleExists) {
      return res.status(404).json({ 
        success: false, 
        message: "Vehicle not found." 
      })
    }
    
    // Check if already in favorites
    const alreadyFavorite = await favoriteModel.isFavorite(account_id, inv_id)
    if (alreadyFavorite) {
      return res.status(400).json({ 
        success: false, 
        message: "Vehicle is already in your favorites." 
      })
    }
    
    // Add to favorites
    const result = await favoriteModel.addFavorite(account_id, inv_id)
    
    if (result && result.favorite_id) {
      return res.status(200).json({ 
        success: true, 
        message: "Vehicle added to favorites!",
        favorite_id: result.favorite_id
      })
    } else {
      throw new Error("Failed to add to favorites")
    }
  } catch (error) {
    console.error("addToFavorites error: " + error)
    return res.status(500).json({ 
      success: false, 
      message: "Error adding to favorites. Please try again." 
    })
  }
}

/* ***************************
 *  Remove vehicle from favorites (AJAX)
 * ************************** */
favCont.removeFromFavorites = async function (req, res, next) {
  const { inv_id } = req.body
  const account_id = res.locals.accountData.account_id
  
  try {
    // Check if in favorites
    const isFav = await favoriteModel.isFavorite(account_id, inv_id)
    if (!isFav) {
      return res.status(404).json({ 
        success: false, 
        message: "Vehicle is not in your favorites." 
      })
    }
    
    // Remove from favorites
    const result = await favoriteModel.removeFavorite(account_id, inv_id)
    
    if (result) {
      return res.status(200).json({ 
        success: true, 
        message: "Vehicle removed from favorites." 
      })
    } else {
      throw new Error("Failed to remove from favorites")
    }
  } catch (error) {
    console.error("removeFromFavorites error: " + error)
    return res.status(500).json({ 
      success: false, 
      message: "Error removing from favorites. Please try again." 
    })
  }
}

/* ***************************
 *  Check if vehicle is favorite (AJAX)
 * ************************** */
favCont.checkFavoriteStatus = async function (req, res, next) {
  const { inv_id } = req.query
  const account_id = res.locals.accountData.account_id
  
  try {
    const isFav = await favoriteModel.isFavorite(account_id, inv_id)
    
    return res.status(200).json({ 
      success: true, 
      isFavorite: isFav 
    })
  } catch (error) {
    console.error("checkFavoriteStatus error: " + error)
    return res.status(500).json({ 
      success: false, 
      message: "Error checking favorite status." 
    })
  }
}

module.exports = favCont
