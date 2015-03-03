var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    annotate = require('gulp-ng-annotate');

gulp.task("scripts", function () {
    return gulp.src('client/app/**/*.js')
        //.pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(annotate())
        .pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('client/build'));
});

gulp.task("watch", function () {
    gulp.watch('client/app/**/*.js', ["scripts"]);
});

gulp.task("default", ["scripts", "watch"], function () {
});
