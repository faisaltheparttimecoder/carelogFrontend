'use strict'
const keys = require('./../src/config/keys')

module.exports = {
  NODE_ENV: '"production"',
  API_URL: JSON.stringify(keys.baseUrl) // Dev API URL
}
