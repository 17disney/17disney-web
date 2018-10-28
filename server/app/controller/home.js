'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const file = path.resolve(__dirname, '../../../dist/index.html');

let index;
fs.readFile(file, (err, data) => {
  index = data;
});

class HomeController extends Controller {
  async index() {
    this.ctx.set('Content-Type', 'text/html');
    this.ctx.body = index;
  }
}

module.exports = HomeController;
