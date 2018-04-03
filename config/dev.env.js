'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const keys = require('./../src/config/keys')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: JSON.stringify(keys.baseUrl) // Dev API URL
})
