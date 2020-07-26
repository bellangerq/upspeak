const { rmdir } = require('fs').promises
const { src, dest, watch, series } = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const gulpif = require('gulp-if')

const isProd = process.env.NODE_ENV === 'production'
const useNotes = require('./src/_data/global').notes

/**
 * Babelify and minify javascript.
 */
function js() {
  return src('src/js/*.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(gulpif(isProd, uglify()))
    .pipe(dest('dist/js'))
}

/**
 * Compiles css into a single file and minifies it.
 */
function css() {
  return src(isProd ? 'src/css/index.css' : 'src/css/**/*.css')
    .pipe(gulpif(isProd, cleanCSS()))
    .pipe(dest('dist/css/'))
}

/** Delete JS and CSS output folders. */
function clean() {
  return Promise.all([
    rmdir('dist/css', { recursive: true }),
    rmdir('dist/js', { recursive: true })
  ])
}

exports.js = js
exports.css = css
exports.clean = clean

exports.watch = function () {
  if (useNotes) {
    watch('src/js/**/*.js', { ignoreInitial: false }, js)
  }
  watch('src/css/**/*.css', { ignoreInitial: false }, css)
}

// one line conditionnal element babeee
exports.build = series(...[clean, ...(useNotes ? [js] : []), css])
