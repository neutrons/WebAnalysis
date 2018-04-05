'use strict'

const path = require('path')
const dotenv = require('dotenv').config({path: path.join(process.env.PWD, '.env')})

module.exports = {
  NODE_ENV: '"production"',
  IS_OFFLINE: process.env.IS_OFFLINE,
  FETCH_SANS_URL: process.env.FETCH_SANS_URL,
  FETCH_TAS_URL: process.env.FETCH_TAS_URL,
  FETCH_POWDER_URL: process.env.FETCH_POWDER_URL,
}