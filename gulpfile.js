var gulp = require('gulp'),
    gutil = require('gulp-util'),
    os = require('os'),
    chalk = require('chalk'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish-ex'),
    del = require('del');


gulp.task('default', ['usage']);

gulp.task('usage', function() {
    "use strict";
    var usageLines = [
        '',
        '',
        chalk.green('usage'),
        '\tDisplay this help page.',
        '',
        chalk.green('jshint'),
        '\tRun jshint on the spec and the js folder under src.',
        '',
        chalk.green('clean:modules'),
        '\tDeletes the npm_modules directory.',
        '\t' + chalk.magenta('NOTE:') + ' ' + chalk.green('npm install') +
        ' will be required before running the app.',
        ''
    ];
    gutil.log(usageLines.join(os.EOL));
});

gulp.task('jshint', function() {
    "use strict";
    return gulp.src([
        'public/**/*.js',
        'gulpfile.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('clean:modules', function() {
    "use strict";
    return del([
        'node_modules'
    ]);
});