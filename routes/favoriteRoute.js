// Needed Resources
const express = require("express")
const router = new express.Router()
const favoriteController = require("../controllers/favoriteController")
const utilities = require("../utilities/")
const favValidate = require("../utilities/favorite-validation")

// Route to build favorites list view
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(favoriteController.buildFavoritesList)
)

// Route to add vehicle to favorites (AJAX)
router.post(
  "/add",
  utilities.checkLogin,
  favValidate.favoriteRules(),
  favValidate.checkFavoriteData,
  utilities.handleErrors(favoriteController.addToFavorites)
)

// Route to remove vehicle from favorites (AJAX)
router.post(
  "/remove",
  utilities.checkLogin,
  favValidate.favoriteRules(),
  favValidate.checkFavoriteData,
  utilities.handleErrors(favoriteController.removeFromFavorites)
)

// Route to check favorite status (AJAX)
router.get(
  "/check",
  utilities.checkLogin,
  utilities.handleErrors(favoriteController.checkFavoriteStatus)
)

module.exports = router
