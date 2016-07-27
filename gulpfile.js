var gulp = require('gulp');
var minify  = require('gulp-minify');

gulp.task("minify", function () {
  gulp.src('script_sanitize.js')
    .pipe(minify({
        ext: {
            src:'.js',
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task("default", ["minify"], function () {

});
