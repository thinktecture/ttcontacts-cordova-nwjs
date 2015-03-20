var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    annotate = require('gulp-ng-annotate')
    NwBuilder = require('node-webkit-builder');

gulp.task("scripts", function () {
    return gulp.src(['client/app/**/*.js', '!client/app/init.js'])
        //.pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(annotate())
        //.pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('client/build'));
});

gulp.task("watch", function () {
    gulp.watch('client/app/**/*.js', ["scripts"]);
});

gulp.task("nw", function () {
    var nw = new NwBuilder({
        version: "0.11.6",
        files: "./client/**",
        buildDir: "./nw-build",
        //winIco: "./client/assets/resources/icon.png",
        macIcns: "./client/assets/resources/icon.icns",
        platforms: ["win32", "win64", "osx32", "osx64"]
    });

    nw.build().then(function () {
        console.log('nw.js: all done.');
    }).catch(function (error) {
        console.error(error);
    });
});

gulp.task("default", ["scripts", "watch"], function () {
});
