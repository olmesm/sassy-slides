const { series, parallel, src, dest, watch } = require('gulp')
const copy = require('gulp-copy')
const concat = require('gulp-concat')
const del = require('del')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const nunjucksRender = require('gulp-nunjucks-render')
const babel = require('gulp-babel')
const webpack = require('webpack-stream')

const siteOutput = './dist'
const sassInput = './src/scss/**/*.scss'
const publicInput = './public/**/*'
const sassInputMain = './src/scss/main.scss'
const sassOutput = siteOutput + '/css'
const jsInput = './src/js/**/*.js'
const jsInputMain = './src/js/index.js'
const jsOutput = siteOutput + '/js/'
const inputTemplates = './src/html/pages/*.html'
const inputSlides = './slides/*.md'
const outputSlide = '_slides.html'
const outputSlideLocation = './src/html/pages'
const htmlInput = './src/html/**/*.html'
const sassOptions = { outputStyle: 'expanded' }
const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
}

function clean () {
  return del(siteOutput)
}

function copyPublicFiles () {
  return src(publicInput)
    .pipe(copy(''))
    .pipe(dest(siteOutput))
    .pipe(browserSync.stream())
}

function compileSass () {
  return src(sassInputMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(dest(sassOutput))
    .pipe(browserSync.stream())
}

function compileJs () {
  return src(['node_modules/babel-polyfill/dist/polyfill.js', jsInputMain])
    .pipe(babel({ presets: ['env'] }))
    .pipe(
      webpack({
        mode: 'production',
        output: {
          filename: 'bundle.js'
        }
      })
    )
    .pipe(dest(jsOutput))
    .pipe(browserSync.reload({ stream: true }))
}

function concatMarkdown () {
  return src(inputSlides)
    .pipe(concat(outputSlide, { newLine: '\n\n---\n\n' }))
    .pipe(dest(outputSlideLocation))
    .pipe(browserSync.reload({ stream: true }))
}

function compileHtml () {
  return src(inputTemplates)
    .pipe(
      nunjucksRender({
        path: ['src/html/']
      })
    )
    .pipe(dest(siteOutput))
    .pipe(browserSync.reload({ stream: true }))
}

function reload (done) {
  browserSync.reload()
  done()
}

function serve (done) {
  browserSync.init({
    server: {
      baseDir: siteOutput
    }
  })
  done()
}

const watchFiles = () => {
  watch(publicInput, series(copyPublicFiles, reload))
  watch(inputSlides, series(concatMarkdown, reload))
  watch(sassInput, series(compileSass, reload))
  watch(jsInput, series(compileJs, reload))
  watch(htmlInput, series(compileHtml, reload))
}

const _default = series(
  clean,
  concatMarkdown,
  copyPublicFiles,
  parallel(compileSass, compileJs, compileHtml)
)
const hotReload = series(_default, serve, watchFiles)

module.exports = {
  default: _default,
  hotReload
}
