const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
 *  Favorite Data Validation Rules
 * ********************************* */
validate.favoriteRules = () => {
  return [
    // inv_id is required and must be a valid integer
    body("inv_id")
      .trim()
      .notEmpty()
      .withMessage("Vehicle ID is required.")
      .isInt({ min: 1 })
      .withMessage("Vehicle ID must be a valid positive number.")
  ]
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkFavoriteData = async (req, res, next) => {
  const { inv_id } = req.body
  let errors = []
  errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Invalid vehicle ID.",
      errors: errors.array()
    })
  }
  next()
}

module.exports = validate
