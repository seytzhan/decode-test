'use strict';

var gulp = require('gulp'),
    expect = require('gulp-expect-file'),
    sass = require('gulp-sass'),
    es = require('event-stream'),
    changed = require('gulp-changed');

var config = {
    sassSrc : 'scss/**/*.{scss,sass}',
    cssDir : 'css/'
};

gulp.task('sass', function () {
    return es.merge(
        gulp.src(config.sassSrc)
        .pipe(expect(config.sassSrc))
        .pipe(changed(config.cssDir, {extension: '.css'}))
        .pipe(sass())
        .pipe(gulp.dest(config.cssDir))
    );
});

gulp.task('watch', function () {
    gulp.watch(config.sassSrc, ['sass']);
});

gulp.task('default', ['watch']);
