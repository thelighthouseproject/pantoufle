/*
---------------------------------------
User settings
---------------------------------------
User settings are set in ./assets/manifest.js
*/



/*
---------------------------------------
Gulp definition
---------------------------------------
By default you don’t have to configure anything to
make Gulp work.
- gulp `default` is `prod`.
- gulp `prod`:
- gulp `dev-watch`:
*/

// Include gulp
const gulp = require('gulp');

// Include gulp Plugins
const autoprefixer = require('gulp-autoprefixer');
const concat       = require('gulp-concat');
const jshint       = require('gulp-jshint');
const less         = require('gulp-less');
const nano         = require('gulp-cssnano');
const plumber      = require('gulp-plumber');
const rename       = require('gulp-rename');
const uglify       = require('gulp-uglify');



// Compile our LESS
gulp.task('less', function() {
  return gulp.src( 'assets/less/pantoufle.less' )
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('assets/css'));
});



// Prefix & Minify CSS
gulp.task('css', ['less'], function (done) {
  return gulp.src( 'assets/css/pantoufle.css' )
    .pipe(concat('pantoufle.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(nano({discardComments: {removeAll: true}, autoprefixer: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'));
});



// Lint Task
gulp.task('lint', function() {
  return gulp.src( 'assets/js/pantoufle.js' )
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});



// Concatenate JS plugin with user scripts and minify them.
gulp.task('scripts', function (done) {
  return gulp.src( 'assets/js/pantoufle.js' )
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});



// Watch Files For Changes
gulp.task('dev-watch', function() {
  gulp.watch( 'assets/js/pantoufle.js', ['lint']);
  gulp.watch( 'assets/less/**/*.{less,css}', ['less']);
});






// Production Task
gulp.task('prod', ['lint', 'less', 'css', 'scripts']);



// Default Task
gulp.task('default', ['prod']);
