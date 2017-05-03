var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');

gulp.task('default', ['compress', 'cssmin', 'htmlmin']);

gulp.task('compress', function () {
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('cssmin', function () {
    gulp.src('src/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist'));
});

gulp.task('htmlmin', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});