var gulp = require('gulp'),
    gutil = require('gulp-util'),
    os = require('os'),
    chalk = require('chalk'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish-ex'),
    del = require('del'),
    exec = require('child_process').exec;


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
        chalk.green('deploy'),
        '\tUse firebase-tools to deploy the public folder to firebase hosting.',
        '\tIf more information is needed, run ' + chalk.green('firebase deploy') + ' instead.',
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

gulp.task('deploy', function() {
    "use strict";
    exec('firebase deploy', function(err) {
        if(err) {
            gulp.log(chalk.red('Error encountered!'));
            throw new gutil.PluginError('firebase', err);
        }
        else {
            gutil.log(chalk.green('Successfully deployed') + ' at ' + chalk.cyan('https://js-patterns.firebaseapp.com'));
        }
    });
});