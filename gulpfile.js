var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  sass: ['./app/assets/sass/*.scss'],
  app_js: './app/assets/js/app.js',
  js: ['./app/assets/js/*.js', './app/assets/js/lib/*.js']
};

gulp.task('clean', function(done) {
  del(['./public/build'], done);
});

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/build/css'));
});

gulp.task('js', function() {
  browserify(paths.app_js)
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/build/js'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('build', ['clean', 'js', 'sass']);
gulp.task('default', ['build']);
