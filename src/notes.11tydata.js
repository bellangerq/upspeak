const globals = require('./_data/global')

module.exports = function () {
  return {
    permalink: globals.notes ? 'notes/index.html' : false
  }
}
