const pool = require("../database/")

/* ***************************
 *  Add vehicle to favorites
 * ************************** */
async function addFavorite(account_id, inv_id) {
  try {
    const sql = "INSERT INTO favorites (account_id, inv_id) VALUES ($1, $2) RETURNING *"
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rows[0]
  } catch (error) {
    console.error("addFavorite error: " + error)
    return error.message
  }
}

/* ***************************
 *  Remove vehicle from favorites
 * ************************** */
async function removeFavorite(account_id, inv_id) {
  try {
    const sql = "DELETE FROM favorites WHERE account_id = $1 AND inv_id = $2 RETURNING *"
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rows[0]
  } catch (error) {
    console.error("removeFavorite error: " + error)
    return error.message
  }
}

/* ***************************
 *  Get all favorites for a user
 * ************************** */
async function getFavoritesByAccountId(account_id) {
  try {
    const sql = `SELECT f.favorite_id, f.account_id, f.inv_id, f.created_at,
                 i.inv_make, i.inv_model, i.inv_year, i.inv_price, 
                 i.inv_thumbnail, i.inv_miles, i.inv_color
                 FROM favorites f
                 INNER JOIN inventory i ON f.inv_id = i.inv_id
                 WHERE f.account_id = $1
                 ORDER BY f.created_at DESC`
    const result = await pool.query(sql, [account_id])
    return result.rows
  } catch (error) {
    console.error("getFavoritesByAccountId error: " + error)
    return error.message
  }
}

/* ***************************
 *  Check if vehicle is in favorites
 * ************************** */
async function isFavorite(account_id, inv_id) {
  try {
    const sql = "SELECT * FROM favorites WHERE account_id = $1 AND inv_id = $2"
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rowCount > 0
  } catch (error) {
    console.error("isFavorite error: " + error)
    return false
  }
}

/* ***************************
 *  Get favorite count for a user
 * ************************** */
async function getFavoriteCount(account_id) {
  try {
    const sql = "SELECT COUNT(*) as count FROM favorites WHERE account_id = $1"
    const result = await pool.query(sql, [account_id])
    return parseInt(result.rows[0].count)
  } catch (error) {
    console.error("getFavoriteCount error: " + error)
    return 0
  }
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavoritesByAccountId,
  isFavorite,
  getFavoriteCount
}
