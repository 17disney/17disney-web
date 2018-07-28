'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'development'

const fs = require('fs')
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const nodeCmd = require('node-cmd')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('init for workspace...')
spinner.start()

fs.mkdir('packages', null, err => {
  if (err) throw err


})
